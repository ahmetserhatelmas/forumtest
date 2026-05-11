/** cm → feet + inches (inch rounded to 0.1) */
export function cmToFtIn(cm: number): { ft: number; inch: number } {
  const totalIn = cm / 2.54;
  const ft = Math.floor(totalIn / 12);
  const inch = Math.round((totalIn - ft * 12) * 10) / 10;
  return { ft, inch };
}

/** feet + inches → cm (1 decimal) */
export function ftInToCm(ft: number, inch: number): number {
  return Math.round((ft * 12 + inch) * 2.54 * 10) / 10;
}

export function kgToLb(kg: number): number {
  return Math.round((kg / 0.45359237) * 10) / 10;
}

export function lbToKg(lb: number): number {
  return Math.round(lb * 0.45359237 * 10) / 10;
}

export function computeBmi(input: {
  heightCm?: number | null;
  heightFt?: number | null;
  heightIn?: number | null;
  weightKg?: number | null;
  weightLb?: number | null;
}): number | null {
  const kg =
    input.weightKg != null && !Number.isNaN(input.weightKg) && input.weightKg > 0
      ? input.weightKg
      : input.weightLb != null &&
          !Number.isNaN(input.weightLb) &&
          input.weightLb > 0
        ? input.weightLb * 0.45359237
        : null;

  let heightM: number | null = null;
  if (
    input.heightCm != null &&
    !Number.isNaN(input.heightCm) &&
    input.heightCm > 0
  ) {
    heightM = input.heightCm / 100;
  } else {
    const ft =
      input.heightFt != null &&
      !Number.isNaN(input.heightFt) &&
      input.heightFt >= 0
        ? input.heightFt
        : 0;
    const inch =
      input.heightIn != null &&
      !Number.isNaN(input.heightIn) &&
      input.heightIn >= 0
        ? input.heightIn
        : 0;
    const totalIn = ft * 12 + inch;
    if (totalIn > 0) heightM = totalIn * 0.0254;
  }

  if (kg == null || heightM == null || heightM <= 0) return null;
  const bmi = kg / (heightM * heightM);
  if (!Number.isFinite(bmi)) return null;
  return Math.round(bmi * 10) / 10;
}
