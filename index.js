const { app, BrowserWindow } = require('electron')

let win

function createWindow () {
  // Создаем окно браузера.
  win = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // и загружаем index.html в окно.
  win.loadFile('xedin.html')

  // Перемещаем окно каждые 100 мс
  let x = 0, y = 0;
  let dx = 2, dy = 2;

  setInterval(() => {
    const bounds = win.getBounds();
    const { width, height } = bounds;

    // Получаем размеры экрана
    const { width: screenWidth, height: screenHeight } = require('electron').screen.getPrimaryDisplay().workAreaSize;

    // Меняем направление, если достигли границы
    if (x + width >= screenWidth || x < 0) {
      dx = -dx;
    }
    if (y + height >= screenHeight || y < 0) {
      dy = -dy;
    }

    x += dx;
    y += dy;

    win.setPosition(x, y);
  }, 10);
}

app.whenReady().then(createWindow)