// Obtener referencias a elementos del calendario
const monthYear = document.getElementById('monthYear');
const calendarBody = document.getElementById('calendarBody');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Variables para el manejo de fechas
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Actualizar el calendario
function updateCalendar() {
  // Limpiar el contenido del calendario
  calendarBody.innerHTML = '';

  // Obtener el primer día del mes actual
  const firstDay = new Date(currentYear, currentMonth, 1);

  // Obtener el número de días en el mes actual
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Obtener el índice del día de la semana en el que comienza el mes (0: domingo, 1: lunes, etc.)
  const startDayIndex = firstDay.getDay();

  // Crear las celdas del calendario
  let date = 1;
  for (let row = 0; row < 6; row++) {
    const newRow = document.createElement('tr');
    for (let col = 0; col < 7; col++) {
      if (row === 0 && col < startDayIndex) {
        // Celdas vacías antes del primer día del mes
        const emptyCell = document.createElement('td');
        newRow.appendChild(emptyCell);
      } else if (date > lastDay) {
        // Celdas vacías después del último día del mes
        break;
      } else {
        // Celdas con los números de los días
        const newCell = document.createElement('td');
        newCell.textContent = date;
        newCell.addEventListener('click', selectDate);
        newRow.appendChild(newCell);
        date++;
      }
    }
    calendarBody.appendChild(newRow);
  }

  // Actualizar el mes y año en el encabezado
  monthYear.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
}

// Obtener el nombre del mes basado en su índice
function getMonthName(monthIndex) {
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return monthNames[monthIndex];
}

// Seleccionar una fecha
function selectDate(event) {
  const selectedDate = event.target.textContent;

  // Eliminar la clase 'selected' de todas las celdas
  const cells = document.querySelectorAll('#calendarBody td');
  cells.forEach((cell) => cell.classList.remove('selected'));

  // Agregar la clase 'selected' a la celda seleccionada
  event.target.classList.add('selected');

  // Aquí puedes agregar la lógica adicional para trabajar con la fecha seleccionada
  console.log(`Fecha seleccionada: ${selectedDate}/${currentMonth + 1}/${currentYear}`);
}

// Event listeners para los botones de cambio de mes
prevBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  updateCalendar();
});

nextBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  updateCalendar();
});

// Actualizar el calendario inicialmente
updateCalendar();
const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: 'FullstackVigo',
  database: 'nombre_de_tu_base_de_datos'
});

// Establecer la conexión a la base de datos
connection.connect((err) => {
  if (err) throw err;
  console.log('Conexión exitosa a la base de datos');
});

// Manejar la solicitud de reserva
app.post('/reservas', (req, res) => {
  const selectedDate = req.body.selectedDate; 
  // Obtener la fecha seleccionada desde la solicitud

  // Verificar si la fecha ya está reservada en la base de datos
  const checkQuery = `SELECT * FROM reservas WHERE fecha = '${selectedDate}'`;
  connection.query(checkQuery, (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      res.send('La fecha seleccionada ya está reservada');
    } else {
      // Insertar la reserva en la base de datos
      const insertQuery = `INSERT INTO reservas (fecha) VALUES ('${selectedDate}')`;
      connection.query(insertQuery, (err, results) => {
        if (err) throw err;
        res.send('Reserva exitosa');
      });
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
