<?php
/** ===============================================================================================
 * AJAX Action handler class
 * @author: Scott Henshawe
 * @copyright: 2015 Kibble Games Inc, in cooperation with VFS
 *
 */

// include('ajax_server.php');   // If you want to modify the ajax server and subclass from it

class Server /* extends ajax_server */ {

    private $debug_mode = TRUE;


    public function __construct() {

        if (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists

            $action = $_POST["action"];   // Get the action requested, make these up as needed

            switch( $action ) {     //Switch case for value of action
                case "submit":
                    $response = $this->update_restaurant();
                    break;

                case "validate":
                    $response = $this->check_restaurant();
                    break;

                default:
                    $response = $this->is_error( "Error: 101 - Invalid action." );
                    break;
            }

            echo $response;
            return 0;
        }
    }


    private function is_ajax() {

        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    }


    /*
     * When we encounter an error the handler should call is error with a message and hand that back
     * as a response to the client
     */
    private function is_error( $error_msg ) {

        // Create a response array (attrib => value) with the origingal post params to start
        $response = $_POST;

        // Add our error message
        $response["error"] = $error_msg;

        // convert the whole response to a JSON string, then add that string
        // as another element to the return message
        //
        // This lets us see the data coming back as a string in the debugger
        if ($this->debug_mode) {

            $response["json"] = json_encode( $response );
        }

        // Respond to the client with a JSON string containing attrib => value pairs encoded
        return json_encode( $response );
    }


    private function check_restaurant() {

        $response = $_POST;

        if ($response["favorite_restaurant"] = "") {

            $response["favorite_restaurant"] = "Joeys";
        }

        if ($this->debug_mode) {

            $response["json"] = json_encode( $response );
        }

        // Respond to the client with a JSON string containing attrib => value pairs encoded
        return json_encode( $response );
    }


    // Here is the actual worker function, this is where you do your server sode processing and
    // then generate a json data packet to return.
    //
    private function update_restaurant() {

        $response = $_POST;

        // Do what you need to do with the info. The following are some examples.
        if ($response["favorite_beverage"] == ""){
             $response["favorite_beverage"] = "Coke";
        }

        $response["favorite_restaurant"] = "McDonald's";


        if ($this->debug_mode) {

            $response["json"] = json_encode( $response );
        }

        // Respond to the client with a JSON string containing attrib => value pairs encoded
        return json_encode( $response );
    }
}


// ========================================================================
//
// MAIN Handler to process POST requests
//
$ajax_post_handler = new Server;
?>