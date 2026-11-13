<?php

use App\Enums\AccionAuditoria;
use App\Models\Area;
use App\Models\Auditoria;
use App\Models\User;

test('al crear un modelo auditable se registra quién lo creó', function () {
    $usuario = User::factory()->create();

    $this->actingAs($usuario);

    $area = Area::create(['nombre' => 'Cultura', 'slug' => 'cultura']);

    $auditoria = $area->auditorias()->sole();

    expect($auditoria->accion)->toBe(AccionAuditoria::Creado)
        ->and($auditoria->user_id)->toBe($usuario->id)
        ->and($auditoria->valores_antes)->toBeNull()
        ->and($auditoria->valores_despues['nombre'])->toBe('Cultura');
});

test('al actualizar se guardan los valores anteriores y nuevos solo de lo que cambió', function () {
    $area = Area::factory()->create(['nombre' => 'Cultura', 'descripcion' => 'Original']);

    $area->update(['nombre' => 'Cultura y arte']);

    $auditoria = $area->auditorias()->where('accion', AccionAuditoria::Actualizado)->sole();

    expect($auditoria->valores_antes)->toBe(['nombre' => 'Cultura'])
        ->and($auditoria->valores_despues)->toBe(['nombre' => 'Cultura y arte']);
});

test('los datos sensibles se enmascaran en la bitácora', function () {
    $usuario = User::factory()->create();

    $usuario->update(['password' => 'otra-contrasena-larga']);

    $auditoria = $usuario->auditorias()->where('accion', AccionAuditoria::Actualizado)->sole();

    expect($auditoria->valores_despues['password'])->toBe('********')
        ->and($auditoria->valores_antes['password'])->toBe('********');
});

test('los cambios sin valor informativo no generan registros', function () {
    $usuario = User::factory()->create();
    $registros = $usuario->auditorias()->count();

    $usuario->forceFill(['remember_token' => 'nuevo-token'])->save();

    expect($usuario->auditorias()->count())->toBe($registros);
});

test('al eliminar se registra la acción con los valores que tenía el modelo', function () {
    $area = Area::factory()->create(['nombre' => 'Deporte']);

    $area->delete();

    $auditoria = $area->auditorias()->where('accion', AccionAuditoria::Eliminado)->sole();

    expect($auditoria->valores_antes['nombre'])->toBe('Deporte')
        ->and($auditoria->valores_despues)->toBeNull();
});

test('se puede dejar constancia de una consulta de datos sensibles', function () {
    $usuario = User::factory()->create();
    $consultado = User::factory()->create();

    $this->actingAs($usuario);
    $consultado->registrarAuditoria(AccionAuditoria::Consultado);

    $auditoria = Auditoria::where('accion', AccionAuditoria::Consultado)->sole();

    expect($auditoria->user_id)->toBe($usuario->id)
        ->and($auditoria->auditable_id)->toBe($consultado->id)
        ->and($auditoria->auditable_type)->toBe($consultado->getMorphClass());
});
