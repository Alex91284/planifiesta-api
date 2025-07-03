from typing import List, Dict

def calcular_presupuesto(dia: int, aportes: List[Dict[str, int]], presupuesto_inicial: int = 3_000_000):
    if not (1 <= dia <= 60):
        raise ValueError("El día debe estar entre 1 y 60")

    tramos = [
        (1, 20, 50_000, 25_000),   # Día 1-20
        (21, 40, 55_000, 27_000),  # Día 21-40
        (41, 60, 60_000, 28_000),  # Día 41-60
    ]

    costo_total = 0

    for inicio, fin, catering, decoracion in tramos:
        if dia < inicio:
            break
        dias_en_tramo = min(dia, fin) - inicio + 1
        costo_diario = catering + decoracion
        costo_total += dias_en_tramo * costo_diario

    aportes_filtrados = [a for a in aportes if a["dia"] <= dia]
    total_aportes = sum(a["monto"] for a in aportes_filtrados)

    presupuesto_restante = presupuesto_inicial + total_aportes - costo_total

    return {
        "dia": dia,
        "costo_total": costo_total,
        "presupuesto_restante": presupuesto_restante,
        "aportes": aportes_filtrados
    }
