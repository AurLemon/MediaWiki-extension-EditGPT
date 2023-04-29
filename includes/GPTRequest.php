<?php

use ApiBase;
use Curl\Curl;

class GPTRequest extends ApiBase {
    public function execute() {
        $params = $this->extractRequestParams();
        $token = $params['Token'];
        $speechIndex = $params['Speech'];

        if ($token !== $GLOBALS['wgEditGPTSecurityToken']) {
            throw new Exception("Token error: $token");
        }

        if ($GLOBALS['wgEditGPTAPIKey'] == null) {
            throw new Exception("Please enter the API key.");
        }

        // $url = $GLOBALS['wgServer'] . $GLOBALS['wgScriptPath'] . '/api.php?action=checktoken&type=login&token=' . $token . '%2B%5C';
        // $cu = curl_init($url);
        // curl_setopt($cu, CURLOPT_RETURNTRANSFER, true);
        // $tokenResult = curl_exec($cu);
        // $httpcode = curl_getinfo($cu, CURLINFO_HTTP_CODE);
        // if ($tokenResult === false || $httpcode != 200) {
        //     $error = curl_error($cu);
        //     throw new Exception("cURL Error: $error");
        // }
        // $response = json_decode($tokenResult, true);

        $inputText = $params['inputText'];

        if ($speechIndex !== 0) {
            $speechCustomize = $GLOBALS['wgEditGPTSpeech'];
            $inputText .= $speechCustomize[$speechIndex - 1]['describe'];
        }

        if (empty($inputText)) {
            throw new InvalidArgumentException('Invalid input text.');
        }
    
        $apiUrl = $GLOBALS['wgEditGPTAPIBase'] . '/v1/chat/completions';
    
        $data = array(
            'model' => $GLOBALS['wgEditGPTModel'],
            'messages' => [
                [
                    'role' => $GLOBALS['wgEditGPTRole'],
                    'content' => $inputText
                ]
            ],
            'max_tokens' => $GLOBALS['wgEditGPTMaxTokens'],
            'temperature' => $GLOBALS['wgEditGPTTemperature']
        );
    
        $ch = curl_init($apiUrl);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $GLOBALS['wgEditGPTAPIKey']
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $result = curl_exec($ch);
        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if ($result === false || $httpcode != 200) {
            $data = json_decode($result, true);
            $message = $data['error']['message'];
            throw new Exception("An error occurred while requesting '$apiUrl'. Cause: '$message'. It may be a problem with network settings, API Base or API Key settings.");
        }
        curl_close($ch);
    
        $this->getResult()->addValue(null, $this->getModuleName(), $result);
        return $result;
    }
    
    public function getAllowedParams() {
    return [
        'inputText' => [
            ApiBase::PARAM_TYPE => 'string',
            ApiBase::PARAM_REQUIRED => true,
        ],
        'History' => [
            ApiBase::PARAM_TYPE => 'string',
            ApiBase::PARAM_REQUIRED => false,
        ],
        'Token' => [
            ApiBase::PARAM_TYPE => 'string',
            ApiBase::PARAM_REQUIRED => true,
        ],
        'Speech' => [
            ApiBase::PARAM_TYPE => 'string',
            ApiBase::PARAM_REQUIRED => false,
        ]
    ];
}
}