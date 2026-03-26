/**
 * Returns the localized value of a field from a database record.
 * For locale "en", looks for field_en; for "de", field_de.
 * Falls back to the Turkish (default) value if the localized field is empty.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function localize(
  item: any,
  field: string,
  locale: string
): string {
  if (locale === "tr") {
    return (item[field] as string) ?? "";
  }
  const localizedKey = `${field}_${locale}`;
  const localizedValue = item[localizedKey] as string | undefined;
  if (localizedValue && localizedValue.trim() !== "") {
    return localizedValue;
  }
  return (item[field] as string) ?? "";
}

/**
 * Returns the localized array value of a field from a database record.
 * For locale "en", looks for field_en; for "de", field_de.
 * Falls back to the Turkish (default) array if the localized field is empty.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function localizeArray(
  item: any,
  field: string,
  locale: string
): string[] {
  if (locale === "tr") {
    return (item[field] as string[]) ?? [];
  }
  const localizedKey = `${field}_${locale}`;
  const localizedValue = item[localizedKey] as string[] | undefined;
  if (localizedValue && localizedValue.length > 0) {
    return localizedValue;
  }
  return (item[field] as string[]) ?? [];
}
