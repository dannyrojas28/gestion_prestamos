<?php

//Access-Control-Allow-Origin header with wildcard.
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
$data = json_decode(file_get_contents('php://input'), false);
if(isset($data->action)){
    $action = $data->action;
    switch ($action) {
        case 'validar_cedula':
            $response = ValidarCedula($data);
            # code...
            break;
         case 'validar_prestamo':
            $response = ValidarPrestamo($data);
            # code...
            break;
        
        default:
            # code...
            $response = array('response'=>false);
            break;
    }

    echo json_encode($response);
}else{
    $json = array('response'=>false);
    echo json_encode($json);
}

function ValidarCedula($data){
    # code...
        if(isset($data->cedula)){
            $cedula = $data->cedula;
    		$sql = "select * FROM clientes WHERE cedula = '$cedula' ";
            $existe = false;

            $stmt = getConnection()->query($sql);
            $sql = $stmt->fetchAll(PDO::FETCH_OBJ);
            
            if(count($sql)>0){
                $existe = true;
            }

            $response = array('response'=>true,'existe'=>$existe);
             
        }else{
            $response = array('response'=>false);
        }
        return $response;
}

function ValidarPrestamo($data){
    if(isset($data->cedula) && isset($data->nombres) && isset($data->apellidos) && isset($data->fechan) && isset($data->empresa) && isset($data->nit) && isset($data->salario) && isset($data->fechai) ){
       $validar_cedula = ValidarCedula($data);
       if($validar_cedula['existe']==false){
            $hoy = date('Y-m-d');
            $date1 = new DateTime($data->fechai);
            $date2 = new DateTime($hoy);
            $diff = $date1->diff($date2);
            // will output 2 days

            $err = "";
            $valor = 0;
            $aprobado = false;
            
            if($diff->days>548){
                if($data->salario>800000){
                    if ($data->salario>=800000 && $data->salario<1000000) {
                        $valor="5.000.000";
                        # code...
                    }else  if ($data->salario>=1000000 && $data->salario<4000000) {
                        $valor="20.000.000";
                    }else  if ($data->salario>=4000000 && $data->salario<100000000) {
                        $valor="50.000.000";
                    }
                     $aprobado = true;
                     $response = array('aprobado'=>true,'response'=>true,'valor'=>$valor);

                }else{
                    $aprobado = false;
                    $err = "Tu crédito ha sido rechazo porque no ganas el salario suficiente.";
                     $response = array('aprobado'=>false,'response'=>true,'error'=>$err);
                }

            }else{
                $aprobado = false;
                $err = "Tu crédito ha sido rechazo porque no tienes el tiempo laboral suficiente.";
                $response = array('aprobado'=>false,'response'=>true,'error'=>$err);
            }

            $insertPuntos   = "INSERT INTO `clientes`(`nombre`, `apellidos`, `cedula`, `fecha_nacimiento`, `empresa`, `nit`, `salario`, `fecha_ingreso`, `estado`, `valor`, `motivo`, `fecha_solicitud`) VALUES (:nombre,:apellido,:cedula,:fechan,:empresa,:nit,:salario,:fechai,:estado,:valor,:motivo,:fechas)";
            $db = getConnection();
                $stmt = $db->prepare($insertPuntos);
                $stmt->bindParam("nombre", $data->nombres);
                $stmt->bindParam("apellido", $data->apellidos);
                $stmt->bindParam("cedula", $data->cedula);
                $stmt->bindParam("fechan", $data->fechan);
                $stmt->bindParam("empresa", $data->empresa);
                $stmt->bindParam("nit", $data->nit);
                $stmt->bindParam("salario", $data->salario);
                $stmt->bindParam("fechai", $data->fechai);
                $stmt->bindParam("estado", $aprobado);
                $stmt->bindParam("valor", $valor);
                $stmt->bindParam("motivo", $err);
                $stmt->bindParam("fechas", $hoy);
                $stmt->execute();

       }else{
         $response = array('aprobado'=>false,'response'=>true,'error'=>"Ups! este número de cédula ya se encuentra registrado.");
       }
    }else{
       $response = array('response'=>false);
    }
    return $response;
}

function getConnection()
{
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $dbname = "prestamos";
    
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
}
?>