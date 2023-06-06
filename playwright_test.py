from playwright.sync_api import sync_playwright
import time

def test_login(mail):
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()

        # Otwórz stronę
        page.goto("https://jafi01.github.io/social-app/")

        # Znajdź pole do wprowadzania adresu e-mail
        email_input = page.wait_for_selector('input[type="email"]')

        # Wpisz adres e-mail
        email_input.fill(mail)

        # Kliknij przycisk "Zaloguj się"
        login_button = page.wait_for_selector('button[type="submit"]')
        login_button.click()
        time.sleep(10)
        # Zakończ test
        browser.close()

def test_submit_post():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=False)
        page = browser.new_page()

        page.goto("https://jafi01.github.io/social-app/")
        email_input = page.wait_for_selector('input[type="email"]')

        email_input.fill("Sincere@april.biz")

        login_button = page.wait_for_selector('button[type="submit"]')
        login_button.click()

        #zamieszczanie posta
        post_title = "Tytuł nowego posta"
        post_body = "Treść nowego posta"

        title_input = page.wait_for_selector('input[type="text"]')
        title_input.fill(post_title)

        body_input = page.wait_for_selector('textarea')
        body_input.fill(post_body)

        submit_button = page.wait_for_selector('button')
        submit_button.click()

        post_container = page.wait_for_selector(f'div.post-container:has-text("{post_title}")')
        assert post_container.is_visible()
        time.sleep(2)
        browser.close()


#test_submit_post()
test_login("zly_email@onet.pl") #błędny adres email
test_login("Sincere@april.biz") #dostępny adres email

