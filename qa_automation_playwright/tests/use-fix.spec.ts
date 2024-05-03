import {test, expect} from "../util/fixture"
import { LoginPage } from '../tests/pages/loginPage';

test('test besed on fixture', 
{ tag: "@fixture-usage" },
async ({ loginPage, page }) => {
    await loginPage.openPage();
    await loginPage.loginWithDefaultParams();
    await page.screenshot();
});


