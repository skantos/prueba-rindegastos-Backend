## Rindegastos Backend (NestJS)

Servicio backend para la prueba técnica de Rindegastos. Expone tres funcionalidades:
- Conversión de divisas usando Open Exchange Rates.
- Cálculo de días hasta un cumpleaños, persistiendo registros en Postgres.
- Cálculo de producto concatenado de números (primeros 9 dígitos).

### Requisitos
- Node 18+
- npm
- Base de datos Postgres (local o Render)

### Instalación
```
npm install
```

### Variables de entorno
Crea un `.env` en la raíz:
```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DBNAME?sslmode=require
OPEN_EXCHANGE_APP_ID=tu_api_key_de_openexchangerates
```
En Render usa la URL externa de la base (con `sslmode=require`) y define ambas variables en el panel de env vars.

### Scripts
```
npm run start:dev   # desarrollo
npm run start:prod  # producción (usa process.env.PORT)
npm run build
```

### Endpoints
- `GET /exchange/getConvertedAmount?from=CLP&to=USD&amount=15000&date=YYYY-MM-DD (opcional)`
  - Devuelve monto convertido y tasa. Usa la API de Open Exchange Rates con la app id del `.env`.

- `POST /birthday`  
  Body JSON: `{ "name": "Ana", "birthdate": "1990-05-10" }`  
  Guarda en Postgres y devuelve `daysUntilBirthday`.

- `GET /birthday`  
  Lista todos los cumpleaños con `daysUntilBirthday` (orden ascendente por id).

- `GET /birthday/getDaysUntilMyBirthday?birthdate=1990-05-10`  
  Calcula días sin guardar.

- `GET /numbers/getTheNumber?first=192&second=3`  
  Devuelve el producto concatenado de los resultados (primeros 9 dígitos).

### Seguridad y configuración
- `ValidationPipe` global (whitelist/transform).
- Throttle global (`ttl: 60`, `limit: 30`).
- TypeORM con `synchronize: true` para simplificar en desarrollo. En producción se recomienda migraciones y `synchronize: false`.

### Deploy en Render (resumen)
1. Crear Postgres en Render y copiar la External Database URL (usar `?sslmode=require`).
2. Crear Web Service (Node):
   - Build: `npm install && npm run build`
   - Start: `npm run start:prod`
   - Env vars: `DATABASE_URL`, `OPEN_EXCHANGE_APP_ID`, `NODE_ENV=production` (opcional).
3. Probar con los endpoints anteriores usando la URL pública del servicio.
