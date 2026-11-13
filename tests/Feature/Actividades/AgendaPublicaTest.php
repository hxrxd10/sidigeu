<?php

use App\Models\Actividad;
use App\Models\Espacio;
use App\Models\TipoActividad;
use App\Models\Unidad;

beforeEach(function () {
    $this->unidad = Unidad::factory()->create(['nombre' => 'Unidad de Cultura']);
    $this->espacio = Espacio::factory()->create(['nombre' => 'Teatro de Cámara']);

    $this->actividad = Actividad::factory()->enAgenda()
        ->enFecha('2026-03-15')
        ->create([
            'unidad_id' => $this->unidad->id,
            'espacio_id' => $this->espacio->id,
            'nombre' => 'Concierto de marimba',
            'descripcion' => 'Repertorio de marimba nacional.',
            'hora_inicio' => '17:00:00',
            'hora_fin' => '19:00:00',
            'tipo_actividad_id' => TipoActividad::factory()->create(['nombre' => 'Concierto'])->id,
        ]);
});

test('la ficha de una actividad de la agenda se ve sin iniciar sesión', function () {
    $this->get(route('publico.agenda.show', $this->actividad))
        ->assertOk()
        ->assertInertia(fn ($pagina) => $pagina
            ->component('publico/agenda/show')
            ->where('actividad.nombre', 'Concierto de marimba')
            ->where('actividad.lugar', 'Teatro de Cámara')
            ->where('actividad.unidad', 'Unidad de Cultura')
            ->where('actividad.hora_inicio', '17:00'));
});

test('una actividad que no está en la agenda no tiene ficha pública', function () {
    $borrador = Actividad::factory()->create(['unidad_id' => $this->unidad->id]);

    $this->get(route('publico.agenda.show', $borrador))->assertNotFound();
    $this->get(route('publico.agenda.calendario', $borrador))->assertNotFound();
});

test('la ficha trae los metadatos para compartir en el HTML', function () {
    $respuesta = $this->get(route('publico.agenda.show', $this->actividad))->assertOk();

    $html = $respuesta->getContent();

    expect($html)
        ->toContain('<meta property="og:title" content="Concierto de marimba">')
        ->toContain('<meta property="og:type" content="article">')
        ->toContain('og-sigeu.png')
        ->toContain('<meta name="twitter:card" content="summary_large_image">');

    // La descripción lleva el cuándo y el dónde, que es lo que se ve al pegar
    // el enlace en WhatsApp o en Facebook.
    expect($html)->toContain('Teatro de Cámara')
        ->toContain('17:00');
});

test('la ficha publica el evento como dato estructurado', function () {
    $html = $this->get(route('publico.agenda.show', $this->actividad))->getContent();

    expect($html)->toContain('application/ld+json');

    preg_match('#<script type="application/ld\+json">(.*?)</script>#s', $html, $partes);

    $evento = json_decode($partes[1], true);

    expect($evento['@type'])->toBe('Event')
        ->and($evento['name'])->toBe('Concierto de marimba')
        ->and($evento['startDate'])->toBe('2026-03-15T17:00:00-06:00')
        ->and($evento['endDate'])->toBe('2026-03-15T19:00:00-06:00')
        ->and($evento['location']['name'])->toBe('Teatro de Cámara')
        ->and($evento['eventStatus'])->toBe('https://schema.org/EventScheduled');
});

test('el mapa del sitio lista lo público y nada más', function () {
    $borrador = Actividad::factory()->create(['unidad_id' => $this->unidad->id]);

    $respuesta = $this->get('/sitemap.xml')
        ->assertOk()
        ->assertHeader('Content-Type', 'application/xml; charset=utf-8');

    expect($respuesta->getContent())
        ->toContain(route('publico.agenda'))
        ->toContain(route('publico.agenda.show', $this->actividad))
        ->not->toContain(route('publico.agenda.show', $borrador));
});

test('robots.txt deja fuera lo que está tras el inicio de sesión', function () {
    $respuesta = $this->get('/robots.txt')->assertOk();

    expect($respuesta->getContent())
        ->toContain('Disallow: /actividades')
        ->toContain('Disallow: /recurso-humano')
        ->toContain('Sitemap: '.route('publico.sitemap'));
});

test('la agenda del mes anuncia su propio título', function () {
    $this->get(route('publico.agenda', ['mes' => '2026-03']))
        ->assertOk()
        ->assertInertia(fn ($pagina) => $pagina->where('meta.titulo', 'Agenda Cultural · Marzo de 2026'));
});
