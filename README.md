# Schoology Scraper
    Soooooooo... This is our submission for HackPNW we had fun but don't expect that our project will go very far. We think that this project has potential with more work put into the front and back end and if we improve features and integration but hopefully it isn't too awful in its current state. Neither of us have that much experience in web development so we decided to forgo a database and nothing is persistant (this is probably the first feature that would need to be improved). In addition to that, our method of authentication with Schoology so that we can make http requests is the most scuffed thing you have ever seen in your life (you copy and paste a cookie from dev tools) but I'm confident that an improvement on this front would be very possible.

## Directions

    As mentioned, this application is extremely scuffed so here is how you use it:

    1. Find a way to open scraped.html
    2. Click on the settings icon in the top right
    3. Enter your preferences
    4. Go to schoology and log in
    5. Open dev tools and select the "Network" tab at the top
    6. Enable "Preserve Log" (On firefox click the settings icon in the top right of dev tools and enable "Persist Logs")
    7. Click on any assignment from your up-coming sidebar
    8. Scroll to the top of the generated list of requests and click on the request labeled "info"
    9. Under "Request Headers" located the "Cookie" value and copy/paste it into the "Cookie" text box in the settings of the scraper app
    10. I don't know you I'll let you know soon

    *And just like that you're done!!!!*