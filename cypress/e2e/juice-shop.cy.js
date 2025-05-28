import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { RegistrationPage } from "../pageObjects/RegistrationPage";
import { SelectAddressPage } from "../pageObjects/SelectAddressPage";
import { PaymentOptionsPage } from "../pageObjects/PaymentOptionsPage";
import {OrderSummaryPage} from "../pageObjects/OrderSummaryPage";
import { SavedAddressesPage } from "../pageObjects/SavedAddressesPage";




describe("Juice-shop scenarios", () => {
  context("Without auto login", () => {
    beforeEach(() => {
      HomePage.visit();
      HomePage.dismissButton.click();
      HomePage.meWantItButton.click();
    });

    it("Login", () => {
      // Click Account button
      HomePage.accountButton.click();
      // Click Login button
      HomePage.loginButton.click();
      // Set email value to "demo"
      LoginPage.emailField.type("demo");
      // Set password value to "demo"
      LoginPage.passwordField.type("demo");
      // Click Log in
      LoginPage.loginButton.click();
      // Click Account button
      HomePage.accountButton.click();
      // Validate that "demo" account name appears in the menu section
      HomePage.userProfileMenuButton.should("contain.text", "demo");
    });

    it("Registration", () => {
      // Click Account button
      HomePage.accountButton.click();
      // Login button
      HomePage.loginButton.click();
      // Click "Not yet a customer?"
      LoginPage.notYetCustomerLink.click();
      // Find - how to generate random number in JS
      // Use that number to genarate unique email address, e.g.: email_7584@ebox.com
      // Save that email address to some variable
      const emailNumber = Math.floor(Math.random() * 101);
      const email = "email_" +  emailNumber.toString() + "@ebox.com";
      const password = "randomPassword";
      RegistrationPage.emailField.type(email);
      // Fill in password field and repeat password field with same password
      RegistrationPage.passwordField.type(password);
      RegistrationPage.repeatPasswordField.type(password);
      // Click on Security Question menu
      RegistrationPage.securityQuestionField.click();
      // Select  "Name of your favorite pet?"
       RegistrationPage.menuOptions.contains("Name of your favorite pet?").click();
      // Fill in answer
      RegistrationPage.awnserField.type("dog");
      // Click Register button
      RegistrationPage.registerButton.click();
      // Set email value to previously created email
      LoginPage.emailField.type(email);
      // Set password value to previously used password value
      LoginPage.passwordField.type(password);
      // Click login button
      LoginPage.loginButton.click();
      // Click Account button
      HomePage.accountButton.click();
      // Validate that account name (with previously created email address) appears in the menu section
      HomePage.userProfileMenuButton.should("contain.text", email);
    });
  });

  context("With auto login", () => {
    beforeEach(() => {
      cy.login("demo", "demo");
      HomePage.visit();
    });

    it("Search and validate Lemon", () => {
      // Click on search icon
      HomePage.searchIcon.click();
      // Search for Lemon
      HomePage.searchField.type("Lemon {enter}");
      // Select a product card - Lemon Juice (500ml)
      HomePage.productBox.contains("Lemon Juice (500ml)").click();
      // Validate that the card (should) contains "Sour but full of vitamins."
      HomePage.productDescription.should("contain.text", "Sour but full of vitamins.");
    });

    it("xxx",( ) => {"search 500lm and validate Lemon, while having multiple cards"
      // Create scenario - Search 500ml and validate Lemon, while having multiple cards
          
          // Click on search icon
          HomePage.searchIcon.click();
          // Search for 500ml
          HomePage.searchField.type("500ml {enter}");
          // Select a product card - Lemon Juice (500ml)
          HomePage.productBox.contains("Lemon Juice (500ml)").click();
          // Validate that the card (should) contains "Sour but full of vitamins."
          HomePage.productDescription.should("contain.text",
          "Sour but full of vitamins.");

    })


    it("xxx",( ) => {" Search 500ml and validate cards"
      // Create scenario - Search 500ml and validate cards
          
    // Click on search icon
    HomePage.searchIcon.click();
    // Search for 500ml
    HomePage.searchField.type("500ml {enter}");
    // Select a product card - Eggfruit Juice (500ml)
    HomePage.productBox.contains("Eggfruit Juice (500ml)").click();
    // Validate that the card (should) contains "Now with even more exotic flavour."
    HomePage.productDescription.should("contain.text", "Now with even more exotic flavour.");
    // Close the card
    HomePage.closeCardButton.click();
    // Select a product card - Lemon Juice (500ml)
    HomePage.productBox.contains("Lemon Juice (500ml)").click();
    // Validate that the card (should) contains "Sour but full of vitamins."
    HomePage.productDescription.should("contain.text", "Sour but full of vitamins.");
    // Close the card
    HomePage.closeCardButton.click();
    // Select a product card - Strawberry Juice (500ml)
    HomePage.productBox.contains("Strawberry Juice (500ml)").click();
    // Validate that the card (should) contains "Sweet & tasty!"
    HomePage.productDescription.should("contain.text", "Sweet & tasty!");
    })
    
    



    it("xxx",( ) => {"Create scenario - Read a review"
      // Create scenario - Read a review
      // Click on search icon
      HomePage.searchIcon.click();
      // Search for King
      HomePage.searchField.type("King {enter}");
      // Select a product card - OWASP Juice Shop "King of the Hill" Facemask
      HomePage.productBox.contains("OWASP Juice Shop \"King of the Hill\" Facemask").click();
      // Click expand reviews button/icon (wait for reviews to appear)
      HomePage.expandRequestButton.click();
      // Validate review - K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!
      HomePage.reviewText.should("contain.text", "K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!");
  })

  it("xxx",( ) => {"Create scenario -  Add a review"
    // Create scenario - Add a review
    // Click on search icon
    HomePage.searchIcon.click();
    // Search for Raspberry
    HomePage.searchField.type("Raspberry {enter}");
    // Select a product card - Raspberry Juice (1000ml)
    HomePage.productBox.contains("Raspberry Juice (1000ml)").click();
    // Type in review - "Tastes like metal"
    
    HomePage.typeReviewField.click();
    HomePage.typeReviewField.type("Tastes like metal");
    // Click Submit
    HomePage.submitReviewButton.click();
    
    
    
    // Click expand reviews button/icon (wait for reviews to appear)
    HomePage.expandRequestButton.click();
    // Validate review -  "Tastes like metal"
    HomePage.reviewText.should("contain.text", "Tastes like metal");
  })




  it("Validate product card amount changes per page", () => {
    // Validate default amount
    HomePage.productBox.should("have.length", 12);

    // Change to 24 items per page
    HomePage.itemperpage.click(); 
    // Remove validateProductAmount click if not needed
    HomePage.validateProductAmountOption.contains("24")
        .should("be.visible") 
        .click({ force: true }); 

    // Validate 24 cards
    HomePage.productBox.should("have.length", 24);

    // Change to 36 items per page
    HomePage.itemperpage.click();
    HomePage.validateProductAmountOption.contains("36")
        .should("be.visible")
        .click({ force: true });

    // Validate 35 cards (verify if this is intentional)
    HomePage.productBox.should("have.length", 36);
});




    


    
  it("Buy Girlie T-shirt", () => {
    // Create scenario - Buy Girlie T-shirt
    // Click on search icon
    HomePage.searchIcon.click();
    // Search for Girlie
    HomePage.searchField.type("Girlie {enter}");
    // Add to basket "Girlie"
    
    
    HomePage.addToBasketButton.click();
    // Click on "Your Basket" button
    
    HomePage.basketButton.click();
    // Create page object - BasketPage
    HomePage.basketButton.click();
    // Click on "Checkout" button
    HomePage.checkoutButton.click();
    // Create page object - SelectAddressPage
    // Select address containing "United Fakedom"
    SelectAddressPage.address.contains("United Fakedom").click();   
    // Click Continue button
    SelectAddressPage.continueButton.contains("Continue").click();
    // Create page object - DeliveryMethodPage
    // Select delivery speed Standard Delivery
    DeliveryMethodPage.shipping.contains("Standard Delivery").click();
    // Click Continue button
    DeliveryMethodPage.continueButton.contains("Continue").click();
    // Create page object - PaymentOptionsPage
    // Select card that ends with "5678"
    PaymentOptionsPage.card.contains("5678").parent().find(".mdc-radio__native-control").click();
    // Click Continue button
    PaymentOptionsPage.continueButton.click();
    // Create page object - OrderSummaryPage
    // Click on "Place your order and pay"
    OrderSummaryPage.checkoutButton.click();
    // Create page object - OrderCompletionPage
    // Validate confirmation - "Thank you for your purchase!"
     OrderCompletionPage.thankyouForOrder.should("contain.text", "Thank you for your purchase!")
});

 

    

    // Create scenario - Add address
     it("Add address", () => {
    // Click on Account
    HomePage.accountButton.click();
    // Click on Orders & Payment
    HomePage.ordersButton.click();
    // Click on My saved addresses
    HomePage.menuButton.click();
    // Create page object - SavedAddressesPage
    // Click on Add New Address
    SavedAddressesPage.newAddressButton.click();
    // Create page object - CreateAddressPage
    // Fill in the necessary information
    // Click Submit button
    // Validate that previously added address is visible

    });


    // Create scenario - Add payment option
    // Click on Account
    // Click on Orders & Payment
    // Click on My payment options
    // Create page object - SavedPaymentMethodsPage
    // Click Add new card
    // Fill in Name
    // Fill in Card Number
    // Set expiry month to 7
    // Set expiry year to 2090
    // Click Submit button
    // Validate that the card shows up in the list
  });
});
