<?php
function theme_name_scripts() {
	wp_enqueue_style("style-name",
        get_template_directory_uri()."/assets/css/app.css");
	wp_enqueue_script("script-name",
        get_template_directory_uri() . "/assets/js/app.js");
}

add_action("wp_enqueue_scripts", "theme_name_scripts");
