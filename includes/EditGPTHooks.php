<?php

use MediaWiki\MediaWikiServices;

class EditGPTHooks {
    public static function onBeforePageDisplay(OutputPage &$out, Skin &$skin)
    {
        $user = $out->getUser();
        if (!$user->isAllowed('useeditgpt')) {
            return true;
        }

        $action = $out->getRequest()->getVal('action');
        // $veaction = $out->getRequest()->getVal('veaction');
        if ($action === 'edit' || $action === 'submit' || $veaction === 'edit')
        {
            $out->addModules('ext.EditGPT'); // 加载资源模块
            $out->prependHTML(
                "<div id='EditGPTWidget'>" .
                "</div>"
            );            
            $out->addJsConfigVars([
                'EditGPTAPIBase' => $GLOBALS['wgEditGPTAPIBase'],
                'EditGPTAPIKey' => $GLOBALS['wgEditGPTAPIKey'],
                'EditGPTModel' => $GLOBALS['wgEditGPTModel']
            ]);
            $out->addModuleStyles('ext.EditGPT.styles'); // 加载 CSS 样式
        }
        return true;
    }

    public static function onResourceLoaderRegisterModules( ResourceLoader &$resourceLoader )
    {
        $resourceLoader->register(
            'ext.EditGPT',
            [
                'scripts' => [ 'resources/EditGPT.js' ],
                'styles' => [ 'resources/EditGPT.css' ],
                'dependencies' => [ 'mediawiki.util', 'oojs-ui', 'oojs-ui.styles.icons-editing-core' ]
            ]
        );
    }

    public static function onResourceLoaderGetConfigVars(array &$vars)
    {
        global $wgResourceLoaderDebug;
        if ($wgResourceLoaderDebug) {
            $vars['wgEditGPTAPIBase'] = 'https://api.openai.com/v1/';
            $vars['wgEditGPTAPIKey'] = '';
            $vars['wgEditGPTModel'] = 'gpt-3.5-turbo';
        } else {
            $vars['wgEditGPTAPIBase'] = $GLOBALS['wgEditGPTAPIBase'];
            $vars['wgEditGPTAPIKey'] = $GLOBALS['wgEditGPTAPIKey'];
            $vars['wgEditGPTModel'] = $GLOBALS['wgEditGPTModel'];
        }
    }

    // public static function onEditGPTRequest(&$inputText) {
    //     $outputText = GPTRequest::generateResponse($inputText);
    //     return $outputText;
    // }
}

$wgHooks['ResourceLoaderRegisterModules'][] = 'EditGPTHooks::onResourceLoaderRegisterModules';
$wgHooks['BeforePageDisplay'][] = 'EditGPTHooks::onBeforePageDisplay';
$wgHooks['ResourceLoaderGetConfigVars'][] = 'EditGPTHooks::onResourceLoaderGetConfigVars';