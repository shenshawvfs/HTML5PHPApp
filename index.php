<!DOCTYPE html>
<html>
<head>
    <title>HTML5 App Demo</title>
    <link rel='stylesheet' href='css/style.css'>

    <!-- Local styles -->
    <style type='text/css'></style>

    <!-- This is the key CDN to pull jQuery from -->
    <!-- To operate offline we may want these to load from a local source -->
    <script src='//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>

</head>
<!-- The Structure of your app is here - Box model blocks of area -->
<body>
    <div id='app-frame'>
        <header id="intro">
            <h2 id="page-title">AJAX Demo Client</h2>
            <nav id='title' class='header container'>
                <h3 class='content'>Nav Menu Area</h3>
            </nav>
        </header>
        <div class="clearfix"><!-- clear --></div>


        <aside id='sidebar' class='main container'>
            <div id='sidebar-data' class='content'>
                <h4>Sidebar Area</h4>
            </div>
        </aside>


        <div id='wrapper' class='main container'>
            <div id='app-area' class='content'>

                <section id='game-screen'>
                    <!-- ----------------------------------------------------------------------------------
                  <!-- Test form where we will accept user input -->

                    <h3>My main app area here</h3>
                    <section id='intro-screen'>
                        <form id='nickname-form' method='POST' action='server/logon'>
                            <label name='nick-name'>Name: </label>
                            <input type='text'   name='nick-name' value='' />
                            <input type='submit' name='action'    value='Submit' />
                        </form>
                    </section>
                    <p></p>

                    <section id="test-form">
                        <form id="validate-form" class="default-form"
                              accept-charset="utf-8" method='POST' action='server/validate'>
                            <input type="hidden" name="action" value="validate" />
                            <input type="text" name="favorite_beverage" value="" placeholder="Favorite restaurant" />
                            <input type="text" name="favorite_restaurant" value=""  placeholder="Favorite beverage" />
                            <select name="gender">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <input type="submit" name="validate" value="Validate" />
                        </form>
                    </section>

                    <div id='results-area'></div>

                </section>
            </div>
        </div>
    </div>

    <!-- Uncomment one of these, are we building an app or a game? -->
    <!-- <script src='scripts/Game.js'></script> -->
    <script src="scripts/App.js"></script>

</body>
</html>