<?php

if (!defined('TYPO3_MODE')) {
    die('Access denied.');
}


// Default TypoScript for Typo3TmplFidaac
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
    $_EXTKEY,
    'Configuration/TypoScript',
    'typo3 tmpl fidaac'
);
