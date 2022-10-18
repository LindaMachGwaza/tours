
import Login from '../pages/Login';



describe('Email validation', () => {
    let email = '';

    test('an empty input should not be valid', () => {
        expect(Login(email)).toEqual(false);
    })
})


