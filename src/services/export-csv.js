import { ExportToCsv } from 'export-to-csv';

/**
 * Export data to csv
 * @param {Transaction[]} data 
 */
export function exportToCsv(data) {
  if (!data || data.length === 0) {
    return;
  }
  const csvExporter = new ExportToCsv({
    fieldSeparator: ',',
    useKeysAsHeaders: true
  });

  csvExporter.generateCsv(data);
}