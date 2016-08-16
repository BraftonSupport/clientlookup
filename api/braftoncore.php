<?php

ini_set("display_errors", 1);
class braftonCoreApi{

    private $url = "https://core-api.internal.";
    private $postArgs;
    private $brand;
    private $auto = false;
    private $apiErrorMessages = array(
        "Feed not found.",
        "Feed API Key is invalid."
    );

    function __construct($brand = null, $isDev = false){
        if($isDev){
            $this->url = "https://core-api.dev.";
        }
        if($brand === null){
            $this->parseArgs();
            $this->auto = true;
            return;
        }

        $this->brand = $brand;
    }
    private function error($message){
        $response = array();
        $response['success'] = false;
        $response['message'] = $message;
        $response['data'] = $this->postArgs;
        echo json_encode($response);
        die();
    }
    function parseArgs(){
        if(isset($_GET['dev'])){
            $this->postArgs = $parms = $_GET;
            foreach($this->postArgs as $key => $value){
                $this->postArgs[$key] = ($parsed = json_decode($value, true) )? $parsed : $this->postArgs[$key];
            }
        }else{
            $this->postArgs = $parms = json_decode(file_get_contents('php://input'), true);
        }
        if(!isset($parms['brand'])){
            $this->error("No brand was provided.  You must pass either 'brafton' or 'contentlead' as a brand");
        }
        $this->brand = $parms['brand'];
        if(!isset($parms['method'])){
            $this->error("No method was passed as an argument");
        }
    }
    function Init(){
        $this->url = $this->url . $this->brand.".com/api/";

        if($this->auto){
            $method = $this->postArgs['method'];
            $arg = isset($this->postArgs['arg']) ? $this->postArgs['arg'] : null;
            $this->$method($arg);
        }
    }
    function getFeeds($arg = null){

        $url = $this->url."feeds";

        $result = $this->makeCall($url);

        $this->success($result);
    }

    function getFeed($arg = null){
        switch($arg){
            case isset($arg['apiKey']):
                $key = $arg['apiKey'];
                break;
            case isset($arg['feedid']):
                $key = $arg['feedId'];
                break;
            default:
                $key = null;
        }
       if($key == null){
            $this->error("No parameter was provided for the " . __METHOD__ . ".  You must pass either an API Key or a Feed ID");
        }
        $url = $this->url."feeds/".$key;

        $result = $this->makeCall($url);
        $this->success($result);
    }
    function getSalesforceUsers($arg = null){

    }
    function getSalesforceUser($id = null){
        if($id === null){
            $this->error("No parameter was provided for the " . __METHOD__ . ".  You must pass either an API Key or a Feed ID");
        }
    }
    private function makeCall($url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("X-Forwarded-Proto"));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        // $output contains the output string
        $output = curl_exec($ch);
        $hinfo = curl_getinfo($ch);

        curl_close($ch);
        return $output;
    }
    private function checkApiErrors($res){
        if(!isset($res['message'])){
            return;
        }
        if(in_array($res['message'], $this->apiErrorMessages)){
            $this->error($res['message']);
        }
    }
    private function success($response){
        $res = array();
        $parsedResponse = json_decode($response, true);
        $this->checkApiErrors($parsedResponse);
        $res['success'] = true;
        $res['data'] = $parsedResponse;
        //if is json
        if($this->auto){
            echo json_encode($res);
            die();
        }
        return $res;
    }
}