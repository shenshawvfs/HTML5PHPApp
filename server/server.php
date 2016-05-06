<?php
// ========================================================================
//
// MAIN Server to process POST requests
//


Class Server {
	// Define a server to handle ajax requests with sepcific actions.

	private $debug = TRUE;

	public function __construct() {
		// Constructor is also the incoming request handler

		// Is this an AJAX request (params and json data?) if not, bye-bye.
		if (!$this->is_ajax())	{
			return;
		}

		// Look for part of the AJAX params to be an attribute called "action"
		// If it exists, and its set to something other than "" we can do
		// something with this request
		//
        if (isset($_POST["action"]) && !empty($_POST["action"])) {

        	// Get the action requested, save it in an easy to access variable
        	// Your API is defined here, the 'actions' this server responds to and
        	// the parameters each action expects. do some error checking.
        	//
            $action = $_POST["action"];
            switch( $action ) {

                case "login":
                    $response = $this->do_login();
                    break;

                default:
                    $this->is_error( "Error 101: Invalid Command.");
                    break;
            };
            
            echo $response;
        };
        

	}


	private function is_ajax() {
		// Function to check if the request is an AJAX request
		//
	    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
	}


	private function is_error( $error_msg ) {

        // Duplicate the posted parameters
	    $response = $_POST;

	    // Add the error code and message
	    $response['error'] = -1;
	    $response['msg'] = $error_msg;

	    return json_encode( $response );
	}


	private function do_login() {
		// Here is the actual worker function, this is where you do your server sode processing and
		// then generate a json data packet to return.

		// Here is what we will send back (echo) to the person that called us.
		// fill this dictionary with attribute => value pairs, then
		// encode as a JSON string, then
		// echo back to caller
		$response = [];


	    // Do what you need to do with the info. The following are some examples.
	    // This is the real set of actual things we use
	    $response["error"] = -1;
	    if ($_POST["nick-name"] == ""){
	         $response["nick-name"] = "John Doe";
	    }
	    $response["nick-name"] = $_POST["nick-name"];
	    $response["msg"] = "You are logged in " . $response["nick-name"];


	    // echo the response JSON back to stdout where the reciever can access and work with it.
	    echo json_encode($response);
	}
}


// now that we have defined the server, create one and only one.
// The constructor will run and immediately handle the request that started this server,
// send a response and exit where it all gets destroyed...
$server = new Server();
?>