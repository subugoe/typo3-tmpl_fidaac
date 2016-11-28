<?php

/***************
 * Temporary variables
 */
$extensionKey = 'typo3_tmpl_fidaac';

/***************
 * Register PageTS
 */
 \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    $extensionKey,
    'Configuration/PageTS/Sitepackage.txt',
    'typo3 tmpl fidaac: All'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    $extensionKey,
    'Configuration/PageTS/Mod/WebLayout/BackendLayouts.txt',
    'typo3 tmpl fidaac: Backend Layouts'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    $extensionKey,
    'Configuration/PageTS/TCEMAIN.txt',
    'typo3 tmpl fidaac: TCEMAIN'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    $extensionKey,
    'Configuration/PageTS/TCEFORM.txt',
    'typo3 tmpl fidaac: TCEFORM'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
    $extensionKey,
    'Configuration/PageTS/RTE.txt',
    'typo3 tmpl fidaac: RTE'
);
