<!DOCTYPE html>
<html lang="no">
    <head>
        <title><?php bloginfo('name'); ?><?php wp_title(); ?></title>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/assets/css/bundle.css" media="screen" title="no title">
        <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
        <?php wp_head(); ?>
    </head>
    <body>

        <header class="header">
            <div class="row">
                <div class="column">
                    Header
                </div>
            </div>
        </header>
