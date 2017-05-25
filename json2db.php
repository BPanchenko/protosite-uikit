<?php
header("Content-Type: application/json; charset=utf-8");
require_once 'config.php';

const FILEPATH = __DIR__ . '/dataset/asteroid-orbits.json';
const TB_NAME = 'asteroids';

/** connect to db */

$DBH = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
$DBH->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

/** read json */

$list = json_decode(file_get_contents(FILEPATH), true);

/** write dataset */

$DBH->query("BEGIN;");
$STH = $DBH->prepare("INSERT INTO `" . DB_NAME . "`.`" . TB_NAME . "` (
    `name`,
    `class`,
    `epoch`,
    `axis`,
    `eccentricity`,
    `inclination`,
    `perihelion_argument`,
    `node_longitude`,
    `mean_anomoly`,
    `perihelion_distance`,
    `aphelion_distance`,
    `period`,
    `intersection`,
    `reference`,
    `magnitude`,
    `created`) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())");

foreach ($list['data'] as $key => $item) {
  print_r ($item['id'] . "\n");
  $STH->bindParam(1, $item['id']);
  $STH->bindParam(2, $item['b']);
  $STH->bindParam(3, $item['c']);
  $STH->bindParam(4, $item['d']);
  $STH->bindParam(5, $item['e']);
  $STH->bindParam(6, $item['f']);
  $STH->bindParam(7, $item['g']);
  $STH->bindParam(8, $item['h']);
  $STH->bindParam(9, $item['i']);
  $STH->bindParam(10, $item['j']);
  $STH->bindParam(11, $item['k']);
  $STH->bindParam(12, $item['l']);
  $STH->bindParam(13, $item['m']);
  $STH->bindParam(14, $item['n']);
  $STH->bindParam(15, $item['o']);
  $STH->execute();
}
$DBH->query("COMMIT;");

?>