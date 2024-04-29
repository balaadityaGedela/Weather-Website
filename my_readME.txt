Create folder, and then cd into that folder
run "npm init -y" to initialize npm
ru "npm i express" then "axios" and remainign required libraries
then you are good to go



this is just webpage, where it shows the weather details using location entered

IF POSSIBLE TRY USING ACCESS THE LOCATION AND DO

do it in neat css way, using animated css



<% if (locals.lat != null) { %>
                <h4>The Location Details are:</h4>
                <p class="latitude">Latitude: <%= lat %></p>
                <p>
                    Longitude: <%= lon %>
                    State: <%= state  %>
                    Country: <%= country %>
                </p>
            <% } else {%>
                <h3>Submit the above details for Location information.</h3>
                <% } %>
        
            <form action="/weather">
                <input type="submit" name="submit" id="" value="Click to Know for weather report">
            </form>