<?php

$rootPageUid = 1;
$rssFeedPageType = 6890; // pageType of the RSS feed page (tx_news)

$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl']['_DEFAULT'] = [
    'init' => [
        'appendMissingSlash' => 'ifNotFile,redirect[301]',
        'respectSimulateStaticURLs' => 0,
        'enableCHashCache' => true,
        'enableUrlDecodeCache' => false,
        'enableUrlEncodeCache' => false,
        'reapplyAbsRefPrefix' => true,
        'adminJumpToBackend' => true,
        'emptyUrlReturnValue' => '/',
    ],
    'preVars' => [
        0 => [
            'GETvar' => 'L',
            'valueMap' => [
                'de' => '1',
            ],
            'noMatch' => 'bypass',
        ],
    ],
    'pagePath' => [
        'type' => 'user',
        'userFunc' => 'EXT:realurl/class.tx_realurl_advanced.php:&tx_realurl_advanced->main',
        'spaceCharacter' => '-',
        'languageGetVar' => 'L',
        'expireDays' => '3',
        'rootpage_id' => $rootPageUid,
        'firstHitPathCache' => 1
    ],
    'fixedPostVars' => [
        'newsDetailConfiguration' => [
            [
                'GETvar' => 'tx_news_pi1[action]',
                'valueMap' => [
                    'detail' => '',
                ],
                'noMatch' => 'bypass'
            ],
            [
                'GETvar' => 'tx_news_pi1[controller]',
                'valueMap' => [
                    'News' => '',
                ],
                'noMatch' => 'bypass'
            ],
            [
                'GETvar' => 'tx_news_pi1[news]',
                'lookUpTable' => [
                    'table' => 'tx_news_domain_model_news',
                    'id_field' => 'uid',
                    'alias_field' => 'title',
                    'addWhereClause' => ' AND NOT deleted',
                    'useUniqueCache' => 1,
                    'useUniqueCache_conf' => [
                        'strtolower' => 1,
                        'spaceCharacter' => '-'
                    ],
                    'languageGetVar' => 'L',
                    'languageExceptionUids' => '',
                    'languageField' => 'sys_language_uid',
                    'transOrigPointerField' => 'l10n_parent',
                    'autoUpdate' => 1,
                    'expireDays' => 180,
                ]
            ]
        ],
        'newsCategoryConfiguration' => [
            [
                'GETvar' => 'tx_news_pi1[overwriteDemand][categories]',
                'lookUpTable' => [
                    'table' => 'sys_category',
                    'id_field' => 'uid',
                    'alias_field' => 'title',
                    'addWhereClause' => ' AND NOT deleted',
                    'useUniqueCache' => 1,
                    'useUniqueCache_conf' => [
                        'strtolower' => 1,
                        'spaceCharacter' => '-'
                    ]
                ]
            ]
        ],
        'newsTagConfiguration' => [
            [
                'GETvar' => 'tx_news_pi1[overwriteDemand][tags]',
                'lookUpTable' => [
                    'table' => 'tx_news_domain_model_tag',
                    'id_field' => 'uid',
                    'alias_field' => 'title',
                    'addWhereClause' => ' AND NOT deleted',
                    'useUniqueCache' => 1,
                    'useUniqueCache_conf' => [
                        'strtolower' => 1,
                        'spaceCharacter' => '-'
                    ]
                ]
            ]
        ],
        '44' => 'newsDetailConfiguration', // Einzelansicht Aktuelles
        '42' => 'newsDetailConfiguration', // Einzelansicht Archiv
        '43' => 'newsCategoryConfiguration', // Liste nach Kategorie
        '143' => 'newsDetailConfiguration', // Einzelansicht American Studies
        '144' => 'newsDetailConfiguration', // Einzelansicht Australian and New Zealand Studies
        '145' => 'newsDetailConfiguration', // Einzelansicht Canadian Studies
        '146' => 'newsDetailConfiguration' // Einzelansicht Englisch; Britisch and Irish Studies
    ],
    'fileName' => [
        'defaultToHTMLsuffixOnPrev' => 0,
        'acceptHTMLsuffix' => 1,
        'index' => [
            'libaac.rss' => [
                'keyValues' => [
                    'type' => $rssFeedPageType
                ],
            ],
        ],
    ],
];
