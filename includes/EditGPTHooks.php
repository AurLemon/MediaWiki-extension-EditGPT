<?php

use MediaWiki\MediaWikiServices;
use ResourceLoaderSkinModule;

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

            $modules = [ 'ext.EditGPT' ];
            $moduleStyles = [ 'ext.EditGPT.styles' ];

            if ($skin->getSkinName() !== 'citizen') {
                $modules[] = 'ext.EditGPT.root';
                $moduleStyles[] = 'ext.EditGPT.root.styles';
            }

            $out->addJsConfigVars([
                'EditGPTSecurityToken' => $GLOBALS['wgEditGPTSecurityToken'],
                'EditGPTSpeech' => $GLOBALS['wgEditGPTSpeech']
            ]);
            
            $out->addModules( $modules );
            $out->addModuleStyles( $moduleStyles );
        }
        return true;
    }
}

$wgHooks['ResourceLoaderRegisterModules'][] = 'EditGPTHooks::onResourceLoaderRegisterModules';
$wgHooks['BeforePageDisplay'][] = 'EditGPTHooks::onBeforePageDisplay';
$wgHooks['ResourceLoaderGetConfigVars'][] = 'EditGPTHooks::onResourceLoaderGetConfigVars';