<?php

class GPTRequest {
    public static function generateResponse($inputText) {
        global $wgEditGPTAPIBase, $wgEditGPTAPIKey, $wgEditGPTModel;

        $curl = curl_init();

        $data = array(
            'model' => $wgEditGPTModel,
            'prompt' => $inputText,
            'temperature' => 0.7,
            'max_tokens' => 60,
            'n' => 1,
            'stop' => '\n'
        );

        $headers = array(
            'Content-Type: application/json',
            'Authorization: Bearer ' . $wgEditGPTAPIKey
        );

        $url = $wgEditGPTAPIBase;

        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));

        $response = curl_exec($curl);

        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
            curl_close($curl);
            return false;
        }

        curl_close($curl);

        $response = json_decode($response, true);
        $output = $response['choices'][0]['text'];

        return $output;
    }
}
