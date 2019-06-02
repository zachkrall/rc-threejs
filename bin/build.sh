#!/bin/bash

for i in $(ls ./js/sketches); do echo "<!DOCTYPE html>
<html>
<head>

    <meta charset=\"utf-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1,shrink-to-fit=no\">

    <title>Project ${i/.js}</title>

    <link rel=\"stylesheet\" type=\"text/css\" href=\"../css/main.css\">

</head>
<body>
<div id=\"app\"></div>
<script type=\"text/javascript\" src=\"../js/lib/three.min.js\"></script>
<script type=\"text/javascript\" src=\"../js/sketches/${i}\"></script>
</body>
</html>" > ./view/${i/.js}.html; done
