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


        // Предупреждение при попытке закрыть вкладку
        window.addEventListener('beforeunload', function (e) {
            // Стандартный метод для большинства браузеров
            e.preventDefault();
            // Для старых браузеров требуется установка returnValue
            e.returnValue = '';
            
            // Дополнительные методы для предотвращения закрытия
            setTimeout(function() {
                window.focus();
            }, 100);
        });

        // Блокировка клавиш закрытия
        document.addEventListener('keydown', function(e) {
            // Alt+F4, Ctrl+W, Ctrl+F4
            if ((e.altKey && e.key === 'F4') || 
                (e.ctrlKey && (e.key === 'w' || e.key === 'W' || e.key === 'F4'))) {
                e.preventDefault();
                alert('Пожалуйста, не закрывайте эту страницу!');
                
                // Открываем новую вкладку если пользователь пытается закрыть
                window.open(window.location.href, '_self');
            }
            
            // F11 для полноэкранного режима (чтобы нельзя было скрыть браузер)
            if (e.key === 'F11') {
                e.preventDefault();
            }
        });

        // Предотвращение сворачивания окна
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                // Когда пользователь переключается на другую вкладку
                alert('Вернитесь на эту вкладку!');
                window.focus();
                
                // Воспроизведение звука (опционально)
                try {
                    var audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQ=');
                    audio.play();
                } catch(e) {}
            }
        });

        // Дополнительная защита - перехват закрытия через контекстное меню
        document.addEventListener('contextmenu', function(e) {
            if (e.target.nodeName === 'A' || e.target.nodeName === 'IMG') {
                e.preventDefault();
            }
        });

        // Постоянное удержание фокуса
        setInterval(function() {
            window.focus();
            document.title = "⚠️ " + document.title.replace("⚠️ ", "");
        }, 30000); // Каждые 30 секунд

        // Блокировка правой кнопки мыши (частично)
        document.oncontextmenu = function() {
            alert('Контекстное меню отключено на этом сайте');
            return false;
        };

        // Сообщение для пользователя
        console.log('⚠️ Внимание: Эта страница защищена от закрытия.');
