import { timeFormatLocale } from "d3-time-format";

const es_ES = {
  dateTime: "%a %b %e %X %Y",
  date: "%d/%m/%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ],
  shortDays: ["Dom", "Lun", "Mar", "Mi", "Jue", "Vie", "Sab"],
  months: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ],
  shortMonths: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic"
  ]
};

export const timeFormatES = date => {
  const localeES = timeFormatLocale(es_ES);
  const localeESFormat = localeES.format("%x");
  return localeESFormat(date);
};

export const getFormattedDate = date => {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return `${month}/${day}/${year}`;
};
