import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
//TODO: implement logger and chaining
/**
 * Represents an Excel utility class for creating Excel files.
 */
class Excel {
  /**
   * Creates an instance of the Excel class.
   * @param {Array} columns - The columns of the Excel worksheet.
   * @param {Array} data - The data to be added to the Excel worksheet.
   * @param {Function} prepareRow - A function to prepare each row of data before adding it to the worksheet.
   * @param {string} fileName - The name of the Excel file to be generated.
   */

  constructor(columns, data, prepareRow, fileName) {
    console.log(columns, 'columns');
    this.workbook = new ExcelJS.Workbook();
    this.workbook.creator = 'Terra Yazılım';
    this.workbook.created = new Date();
    this.workbook.modified = new Date();
    this.worksheet = this.workbook.addWorksheet();
    this.columns = columns;
    this.data = data;
    this.prepareRow = prepareRow;
    this.fileName = fileName;
  }

  /**
   * Changes the artifacts of the Excel instance.
   * @param {any} artifacts - The new artifacts to be assigned.
   */
  changeArtifacts(artifacts) {
    if (!artifacts) return;
    this;
  }

  /**
   * Creates the header row of the Excel worksheet.
   */
  createHeader() {
    if (!this.columns) return;
    this.worksheet.columns = this.columns;
  }

  /**
   * Creates the body rows of the Excel worksheet.
   */
  createBody() {
    console.log('createBody', this.data);
    if (!this.data) return;
    this.data.forEach((row) => {
      this.addRow(this.prepareRow(row));
    });
  }

  /**
   * Adds a single row to the Excel worksheet.
   * @param {Array} row - The row data to be added.
   */
  addRow(row) {
    this.worksheet.addRow(row);
  }

  /**
   * Adds multiple rows to the Excel worksheet.
   * @param {Array} rows - The rows data to be added.
   */
  addRows(rows) {
    this.worksheet.addRows(rows);
  }

  /**
   * Creates the Excel file and saves it.
   */
  async createExcel() {
    this.createHeader();
    this.createBody();
    const buffer = await this.workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `${this.fileName}.xlsx`);
  }
}

class Logger {
  constructor() {
    this.logs = [];
  }
}

class Message {
  Types = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
  };
  constructor() {
    this.message = '';
    this.type = this.Types.INFO;
  }
}

const PREDEFİNED_COLUMNS = [
  { header: 'Durum', key: 'status', width: 15 },
  { header: 'Son Durum', key: 'lastSituation', width: 15 },
  { header: 'Durum', key: 'succeeded', width: 15 },
  { header: 'Kart Numarası', key: 'cardId', width: 30 },
  { header: 'Personel Adı', key: 'employeId', width: 50 },
  { header: 'Görev Başlığı', key: 'transportation', width: 50 },
  { header: 'Tarih', key: 'time', width: 20 },
  { header: 'Araç Plakası', key: 'vehicleId', width: 20 },
  { header: 'Şoför Adı Soyadı', key: 'driverId', width: 30 },
  { header: 'Kordinat', key: 'coordinate', width: 35 },
  { header: 'Adres', key: 'address', width: 35 },
  { header: 'Hareket Adı', key: 'title', width: 24 },
  { header: 'Hareket Adı', key: 'content', width: 24 },
  { header: 'Hareket Durumu', key: 'status', width: 24 },
  { header: 'Sürücü Adı', key: 'driver', width: 30 },
  { header: 'Araç Plakası', key: 'vehicle', width: 12 },
  { header: 'Başlangıç Noktası', key: 'startPoint', width: 24 },
  { header: 'Bitiş Noktası', key: 'endPoint', width: 24 },
  { header: 'Toplam Süre', key: 'totalDuration', width: 24 },
  { header: 'Toplam Mesafe', key: 'totalDistance', width: 24 },
  { header: 'Başlangıç Tarihi', key: 'beginDate', width: 20 },
  { header: 'Bitiş Tarihi', key: 'endDate', width: 20 },
];

/**
 * Represents a ColumnFactory that is used to create and manage columns for a report.
 * @class
 */
class ColumnFactory {
  constructor() {
    this.columns = [];
  }

  /**
   * Creates a new column.
   * @param {string} header
   * @param {string} key
   * @param {number} width
   * @returns {ColumnFactory}
   */
  //will add logger
  createColumn(header, key, width) {
    if (typeof header !== 'string') {
      header = 'Column';
    }
    if (typeof key !== 'string') {
      key = 'column';
    }
    if (typeof width !== 'number') {
      width = 15;
    }
    this.columns.push({ header, key, width });
    return this;
  }
  /**
   * Adds a column to the factory.
   * @param {object } column
   * @param {string} column.header
   * @param {string} column.key
   * @param {number} column.width
   * @returns {ColumnFactory}
   */
  addColumn(column) {
    this.columns.push(column);
    return this;
  }

  /**
   * Adds predefined columns to the factory.
   * @param {string} key
   * @returns {ColumnFactory}
   */
  addColumnsFromPredefined(key) {
    if (key === 'all') {
      this.columns.push(...PREDEFİNED_COLUMNS);
    } else {
      this.columns.push(
        PREDEFİNED_COLUMNS.find((column) => column.key === key),
      );
    }
    return this;
  }

  /**
   * gets the columns of the factory.
   * @returns {object} columns in stack
   */
  getColumns() {
    return this.columns;
  }

  /**
   * gets the predefined columns of the factory.
   * @returns {object} predefined columns
   */
  getPredefinedColumns() {
    return PREDEFİNED_COLUMNS;
  }
  /**
   * Clears the columns of the factory.
   * @returns {ColumnFactory}
   */
  clearColumns() {
    this.columns = [];
    return this;
  }
}

export { Excel, Logger, Message, ColumnFactory };
