<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Bandeja de notificaciones del usuario (RF-T.07).
 */
class NotificacionController extends Controller
{
    public function index(Request $request): Response
    {
        $notificaciones = $request->user()
            ->notifications()
            ->latest()
            ->paginate(20)
            ->through(fn (DatabaseNotification $notificacion): array => [
                'id' => $notificacion->id,
                'titulo' => $notificacion->data['titulo'] ?? 'Notificación',
                'mensaje' => $notificacion->data['mensaje'] ?? '',
                'ruta' => $notificacion->data['ruta'] ?? null,
                'leida' => $notificacion->read_at !== null,
                'fecha' => $notificacion->created_at?->format('d-m-Y H:i'),
            ]);

        return Inertia::render('notificaciones/index', [
            'notificaciones' => $notificaciones,
            'noLeidas' => $request->user()->unreadNotifications()->count(),
        ]);
    }

    public function marcar(Request $request, string $notificacion): RedirectResponse
    {
        $request->user()
            ->notifications()
            ->whereKey($notificacion)
            ->update(['read_at' => now()]);

        return back();
    }

    public function marcarTodas(Request $request): RedirectResponse
    {
        $request->user()->unreadNotifications->markAsRead();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Notificaciones marcadas como leídas.']);

        return back();
    }
}
