<?php

$rootPageUid = 1;
$rssFeedPageType = 6890; // pageType of the RSS feed page (tx_news)

#include the IDs of pages as arrays at the end of the news configuration in fixedPostVars

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
        $newsDetailsIdHome[0] => $newsDetailsIdHome[1], // Einzelansicht Aktuelles
        $newsDetailsIdArchive[0] => $newsDetailsIdArchive[1], // Einzelansicht Archiv
        $newsCategoryId[0] => $newsCategoryId[1], // Liste nach Kategorie
        $newsDetailsIdCollectionAmerican[0] => $newsDetailsIdCollectionAmerican[1], // Einzelansicht American Studies
        $newsDetailsIdCollectionAustralian[0] => $newsDetailsIdCollectionAustralian[1], // Einzelansicht Australian and New Zealand Studies
        $newsDetailsIdCollectionCanadian[0] => $newsDetailsIdCollectionCanadian[1], // Einzelansicht Canadian Studies
        $newsDetailsIdCollectionEnglish[0] => $newsDetailsIdCollectionEnglish[1], // Einzelansicht Englisch; Britisch and Irish Studies
    ],
    'fileName' => [
        'defaultToHTMLsuffixOnPrev' => 0,
        'acceptHTMLsuffix' => 1,
        'index' => [
            'fidaac.rss' => [
                'keyValues' => [
                    'type' => $rssFeedPageType
                ],
            ],
        ],
    ],
];
