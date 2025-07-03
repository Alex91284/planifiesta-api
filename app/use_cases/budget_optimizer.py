# Constantes por rango de días
COSTO_CATERING_RANGO_1 = 50_000
COSTO_DECORACION_RANGO_1 = 25_000

COSTO_CATERING_RANGO_2 = 55_000
COSTO_DECORACION_RANGO_2 = 27_000

COSTO_CATERING_RANGO_3 = 60_000
COSTO_DECORACION_RANGO_3 = 28_000

PRESUPUESTO_INICIAL = 3_000_000


def calcular_presupuesto(dia, aportes, presupuesto_inicial=PRESUPUESTO_INICIAL):
    if dia < 1 or dia > 60:
        raise ValueError("El día debe estar entre 1 y 60")

    # Determinar el costo diario según el rango del día
    if 1 <= dia <= 20:
        costo_dia = COSTO_CATERING_RANGO_1 + COSTO_DECORACION_RANGO_1
    elif 21 <= dia <= 40:
        costo_dia = COSTO_CATERING_RANGO_2 + COSTO_DECORACION_RANGO_2
    else:  # 41 a 60
        costo_dia = COSTO_CATERING_RANGO_3 + COSTO_DECORACION_RANGO_3

    # Costo acumulado hasta ese día
    costo_total = dia * costo_dia

    # Sumar aportes realizados hasta ese día
    aportes_filtrados = [a for a in aportes if a["dia"] <= dia]
    total_aportes = sum(a["monto"] for a in aportes_filtrados)

    presupuesto_restante = presupuesto_inicial + total_aportes - costo_total

    return {
        "dia": dia,
        "costo_total": costo_total,
        "presupuesto_restante": presupuesto_restante,
        "aportes": aportes_filtrados
    }
