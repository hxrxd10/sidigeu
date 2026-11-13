<?php

use App\Enums\AccionAuditoria;
use App\Enums\Rol;
use App\Models\Auditoria;
use App\Models\PersonaRecursoHumano;
use App\Models\User;

use function Pest\Laravel\actingAs;

test('el DPI se oculta a los roles no autorizados', function () {
    $consulta = User::factory()->conRoles(Rol::Consulta)->create();
    $persona = PersonaRecursoHumano::factory()->create(['dpi' => '2987654321101']);

    actingAs($consulta)
        ->get(route('recurso-humano.show', $persona))
        ->assertInertia(fn ($pagina) => $pagina
            ->where('persona.dpi', null)
            ->where('persona.documento_oculto', true));
});

test('el gestor ve el DPI y la consulta queda en la bitácora', function () {
    $gestor = User::factory()->conRoles(Rol::GestorRecursoHumano)->create();
    $persona = PersonaRecursoHumano::factory()->create(['dpi' => '2987654321101']);

    actingAs($gestor)
        ->get(route('recurso-humano.show', $persona))
        ->assertInertia(fn ($pagina) => $pagina
            ->where('persona.dpi', '2987654321101')
            ->where('persona.documento_oculto', false));

    $auditoria = Auditoria::where('accion', AccionAuditoria::Consultado)->sole();

    expect($auditoria->user_id)->toBe($gestor->id)
        ->and($auditoria->auditable_id)->toBe($persona->id);
});

test('la dirección también consulta los datos sensibles', function () {
    $direccion = User::factory()->conRoles(Rol::Direccion)->create();
    $persona = PersonaRecursoHumano::factory()->create(['dpi' => '2987654321101']);

    actingAs($direccion)
        ->get(route('recurso-humano.show', $persona))
        ->assertInertia(fn ($pagina) => $pagina->where('persona.dpi', '2987654321101'));
});

test('al cambiar el DPI la bitácora guarda el cambio pero no el dato', function () {
    $gestor = User::factory()->conRoles(Rol::GestorRecursoHumano)->create();
    $persona = PersonaRecursoHumano::factory()->create(['dpi' => '2987654321101']);

    actingAs($gestor);
    $persona->update(['dpi' => '2987654321102']);

    $auditoria = $persona->auditorias()
        ->where('accion', AccionAuditoria::Actualizado)
        ->sole();

    expect($auditoria->valores_antes['dpi'])->toBe('********')
        ->and($auditoria->valores_despues['dpi'])->toBe('********');
});
