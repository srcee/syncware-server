#!/bin/sh

set -e

echo "Waiting for PostgreSQL to be ready..."

until nc -z $POSTGRES_HOST $POSTGRES_PORT; do
  echo "Waiting for $POSTGRES_HOST:$POSTGRES_PORT..."
  sleep 2
done

echo "PostgreSQL is up!"

# Install PostgreSQL client
apk add --no-cache postgresql-client

# Create the DB if it doesn't exist
echo "Checking if DB exists..."
RESULT=$(PGPASSWORD=$POSTGRES_PASSWORD psql -h $POSTGRES_HOST -U $POSTGRES_USER -tAc "SELECT 1 FROM pg_database WHERE datname='$POSTGRES_DB'")
if [ "$RESULT" != "1" ]; then
  echo "Creating database $POSTGRES_DB..."
  PGPASSWORD=$POSTGRES_PASSWORD psql -h $POSTGRES_HOST -U $POSTGRES_USER -c "CREATE DATABASE $POSTGRES_DB"
else
  echo "Database $POSTGRES_DB already exists."
fi

# Run migrations
echo "Running migrations..."
npm run migration:run

# Start NestJS app
echo "Starting app..."
npm run start:dev
