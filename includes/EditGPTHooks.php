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
            $out->addModules('ext.EditGPT');
            $out->prependHTML(
                "<div id='EditGPTWidget'>" .
                "</div>"
            );            
            $out->addJsConfigVars([
                'EditGPTSecurityToken' => $GLOBALS['wgEditGPTSecurityToken'],
                'EditGPTSpeech' => $GLOBALS['wgEditGPTSpeech']
            ]);
            $out->addModuleStyles('ext.EditGPT.styles');
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
}

$wgHooks['ResourceLoaderRegisterModules'][] = 'EditGPTHooks::onResourceLoaderRegisterModules';
$wgHooks['BeforePageDisplay'][] = 'EditGPTHooks::onBeforePageDisplay';
$wgHooks['ResourceLoaderGetConfigVars'][] = 'EditGPTHooks::onResourceLoaderGetConfigVars';