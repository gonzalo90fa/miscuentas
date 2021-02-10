# miscuentas
Aplicación web que te permite administrar tus cuentas registrando todos los ingresos y gastos, calculando presupuestos y más!

Para su funcionamiento se necesitará un servidor que ejecute PHP y base de datos MySQL. En la carpeta "databaseModel" hay un archivo ".sql" que trae la estructrura de las tablas.
Solo deberás crear una base de datos llamada "gma-mi-billetera" o en caso de querer otro nombre cambiar el valor de la variable "$db" en "src/php/connection.php" (hacer lo mismo con $host, $user y $pass de ser necesario). Luego de haber creado la base de datos deberás importar el archivo ".sql" mencionado anteriormente. Se te crearán las tablas con su estructura. Las tablas tendrán registros como ejemplos, si quieres elimínalos.
Una vez que lo anterior esté hecho ya podrás usar la aplicación, obviamente siempre que quieras utilizarla deberás tener el servidor y base de datos funcionando.
