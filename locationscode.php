<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<head>
<style>
    body {font-family: Verdana, Geneva, Tahoma, sans-serif;}
</style>
</head>
<body>
<?php
$lat=41.89310;
$lng=12.48280;
echo "The Location Code for the coordinates " . $lat . "," . $lng . " is: <strong>". MakeLocationsCode($lat,$lng) . "</strong><hr>";
$code="EJ4N-RG7K";
echo "Le coordinate corrispondenti al codice ".$code . " sono <strong>" . LatFromCode($code,5) . ", " . LngFromCode($code,5) . "</strong>";
function ConvertToBase34($n) {
    static $C = "23456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    static $b = 34;
    $R = "";
    while ($n > 0) {
        $M = $n % $b;
        $R = $C[$M] . $R;
        $n = intdiv($n, $b);
    }
    return substr("2222" . $R, -4);
}
function MakeLocationsCode($a, $b) {
    $lat = floatval(str_replace(",", ".", $a));
    $lon = floatval(str_replace(",", ".", $b));
     if ($lat < -90 || $lat > 90) {
        throw new InvalidArgumentException("Latitude out of range (-90 to +90): $lat");
    }

    if ($lon < -180 || $lon > 180) {
        throw new InvalidArgumentException("Longitude out of range (-180 to +180): $lon");
    }
    $A4 = ConvertToBase34(round(($lat + 90) * 3600));
    $B4 = ConvertToBase34(round(($lon + 180) * 3600));
    $O = str_repeat(" ", 8);
    for ($i = 0; $i < 4; $i++) {
        $O[2*$i]   = $A4[$i];
        $O[2*$i+1] = $B4[$i];
    }
    return substr($O, 0, 4) . "-" . substr($O, 4);
}
function ConvertFromBase34($s) {
    $C = "23456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $value = 0;
    for ($i = 0; $i < strlen($s); $i++) {
        $pos = strpos($C, $s[$i]);
        if ($pos === false) {
            throw new InvalidArgumentException("Invalid character in Locations Code: $s");

        }
        $value = $value * 34 + $pos;
    }
    return $value;
}
function LatFromCode($code, $digit) {
    $clean = str_replace("-", "", $code);
    $A4 = $clean[0] . $clean[2] . $clean[4] . $clean[6];
    $arcsec = ConvertFromBase34($A4);
    return round(($arcsec / 3600 - 90) , $digit);
}
function LngFromCode($code, $digit) {
    $clean = str_replace("-", "", $code);
    $B4 = $clean[1] . $clean[3] . $clean[5] . $clean[7];
    $arcsec = ConvertFromBase34($B4);
   return round(($arcsec / 3600 - 180) , $digit);
}
?>
</body>
</html>