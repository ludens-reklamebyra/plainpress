<?php
function theme_name_scripts() {
    wp_enqueue_style("style-name",
    get_template_directory_uri()."/assets/css/app.css");
}
add_action("wp_enqueue_scripts", "theme_name_scripts");

// Allow SVGs
function cc_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

// Remove adminbar
function my_function_admin_bar(){
	return false;
}
add_filter( 'show_admin_bar' , 'my_function_admin_bar');

// Theme support for featured images
if ( function_exists( 'add_theme_support' ) ) {
	add_theme_support( 'post-thumbnails'  );
}
