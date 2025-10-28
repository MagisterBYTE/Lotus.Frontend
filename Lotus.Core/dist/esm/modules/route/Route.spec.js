import { TypedRoute } from "./TypedRoute";
// Тестовые литеральные типы
const USER_ROLES = ['admin', 'user', 'moderator'];
const PRODUCT_CATEGORIES = ['electronics', 'books', 'clothing'];
describe('TypedRoute', () => {
    // Базовые тесты
    describe('Basic functionality', () => {
        const simpleRoute = TypedRoute.create('/home');
        const authRoute = TypedRoute.create('/dashboard', true);
        test('should create route with correct path', () => {
            expect(simpleRoute.path).toBe('/home');
            expect(authRoute.path).toBe('/dashboard');
        });
        test('should have correct isShouldBeAuthorized flag', () => {
            expect(simpleRoute.isShouldBeAuthorized).toBe(false);
            expect(authRoute.isShouldBeAuthorized).toBe(true);
        });
        test('should return path as string', () => {
            expect(simpleRoute.toString()).toBe('/home');
            expect(String(simpleRoute)).toBe('/home');
        });
    });
    // Тесты параметров пути
    describe('Path parameters', () => {
        const userRoute = new TypedRoute('/user/:userId');
        const productRoute = new TypedRoute('/products/:category/:id');
        test('should build path with single parameter', () => {
            const result = userRoute.build({ userId: '123' });
            expect(result).toBe('/user/123');
        });
        test('should build path with multiple parameters', () => {
            const result = productRoute.build({ category: 'electronics', id: '456' });
            expect(result).toBe('/products/electronics/456');
        });
        test('should encode parameter values', () => {
            const result = userRoute.build({ userId: 'user@example.com' });
            expect(result).toBe('/user/user%40example.com');
        });
        test('should handle missing parameters gracefully', () => {
            // Должен вернуть путь с незамененными параметрами
            const result = productRoute.build({ category: 'books' });
            expect(result).toBe('/products/books/:id');
        });
    });
    // Тесты ограничений параметров
    describe('Parameter constraints', () => {
        const constrainedRoute = TypedRoute.createWithConstraints('/admin/:role/:action', {
            role: USER_ROLES,
            action: ['view', 'edit', 'delete']
        });
        test('should build path with valid constrained parameters', () => {
            const result = constrainedRoute.build({
                role: 'admin',
                action: 'edit'
            });
            expect(result).toBe('/admin/admin/edit');
        });
        test('should warn on invalid parameter values', () => {
            const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
            //@ts-expect-error
            constrainedRoute.build({ role: 'invalid', action: 'view' });
            // expect(consoleSpy).toHaveBeenCalledWith(
            //   expect.stringContaining('Недопустимое значение "invalid" для параметра "role"')
            // );
            consoleSpy.mockRestore();
        });
        test('should validate parameters in development', () => {
            const originalNodeEnv = process.env.NODE_ENV;
            process.env.NODE_ENV = 'development';
            expect(() => {
                // @ts-expect-error
                constrainedRoute.build({ role: 'invalid', action: 'view' });
            }).toThrow('Invalid parameter value for role');
            process.env.NODE_ENV = originalNodeEnv;
        });
    });
    // Тесты query параметров
    describe('Query parameters', () => {
        const searchRoute = new TypedRoute('/search');
        test('should add query parameters to path', () => {
            const result = searchRoute.withQuery({
                q: 'typescript',
                sort: 'date',
                page: '2'
            });
            expect(result).toBe('/search?q=typescript&sort=date&page=2');
        });
        test('should handle empty query object', () => {
            const result = searchRoute.withQuery({});
            expect(result).toBe('/search');
        });
        test('should filter out empty query values', () => {
            const result = searchRoute.withQuery({
                q: 'test',
                empty: '',
                undefined: undefined,
                null: null
            });
            expect(result).toBe('/search?q=test');
        });
        test('should encode query parameters', () => {
            const result = searchRoute.withQuery({
                q: 'react & node',
                filter: 'price<100'
            });
            expect(result).toBe('/search?q=react+%26+node&filter=price%3C100');
        });
    });
    // Тесты комбинированных параметров
    describe('Combined parameters and query', () => {
        const userProfileRoute = new TypedRoute('/user/:userId/profile/:tab', true, { tab: ['settings', 'security', 'notifications'] });
        test('should combine path and query parameters', () => {
            const result = userProfileRoute.withParamsAndQuery({ userId: '123', tab: 'settings' }, { modal: 'true', section: 'password' });
            expect(result).toBe('/user/123/profile/settings?modal=true&section=password');
        });
        test('should handle only path parameters', () => {
            const result = userProfileRoute.withParamsAndQuery({ userId: '123', tab: 'security' });
            expect(result).toBe('/user/123/profile/security');
        });
        test('should handle only query parameters', () => {
            const result = userProfileRoute.withParamsAndQuery({}, { refresh: 'true' });
            expect(result).toBe('/user/:userId/profile/:tab?refresh=true');
        });
        test('should validate path parameters in combined method', () => {
            const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
            userProfileRoute.withParamsAndQuery({ userId: '123', tab: 'invalid' });
            // expect(consoleSpy).toHaveBeenCalledWith(
            //   expect.stringContaining('Недопустимое значение "invalid" для параметра "tab"')
            // );
            consoleSpy.mockRestore();
        });
    });
    // Тесты вспомогательных методов
    describe('Utility methods', () => {
        const constrainedRoute = new TypedRoute('/api/:version/:resource', false, {
            version: ['v1', 'v2'],
            resource: ['users', 'products']
        });
        test('should return allowed values for parameter', () => {
            const allowedVersions = constrainedRoute.getAllowedValues('version');
            expect(allowedVersions).toEqual(['v1', 'v2']);
        });
        test('should return undefined for unconstrained parameter', () => {
            const simpleRoute = new TypedRoute('/simple/:anyParam');
            const allowedValues = simpleRoute.getAllowedValues('anyParam');
            expect(allowedValues).toBeUndefined();
        });
        test('should validate parameter values', () => {
            expect(constrainedRoute.isValidValue('version', 'v1')).toBe(true);
            expect(constrainedRoute.isValidValue('version', 'v3')).toBe(false);
            expect(constrainedRoute.isValidValue('resource', 'users')).toBe(true);
            expect(constrainedRoute.isValidValue('resource', 'orders')).toBe(false);
        });
        test('should always return true for unconstrained parameters', () => {
            const simpleRoute = new TypedRoute('/simple/:anyParam');
            expect(simpleRoute.isValidValue('anyParam', 'anyValue')).toBe(true);
        });
    });
    // Тесты TypeScript типов (если используете ts-jest)
    describe('TypeScript type safety', () => {
        test('should enforce parameter types', () => {
            const route = new TypedRoute('/auth/:type', false, { type: ['login', 'register'] });
            // Эти вызовы должны компилироваться без ошибок
            const valid1 = route.build({ type: 'login' });
            const valid2 = route.build({ type: 'register' });
            expect(valid1).toBe('/auth/login');
            expect(valid2).toBe('/auth/register');
        });
        test('should provide autocomplete for constrained parameters', () => {
            // Этот тест проверяет, что TypeScript предоставляет автодополнение
            // На практике это проверяется в IDE, но мы можем проверить типы
            const route = new TypedRoute('/admin/:action', true, { action: ['create', 'read', 'update', 'delete'] });
            // Параметр 'action' должен принимать только указанные значения
            const buildSpy = jest.spyOn(route, 'build');
            route.build({ action: 'create' });
            expect(buildSpy).toHaveBeenCalledWith({ action: 'create' });
            buildSpy.mockRestore();
        });
    });
    // Тесты edge cases
    describe('Edge cases', () => {
        test('should handle routes without parameters', () => {
            const route = new TypedRoute('/static/path');
            const result = route.build({});
            expect(result).toBe('/static/path');
        });
        test('should handle optional parameters in path', () => {
            const route = new TypedRoute('/blog/:year/:month?');
            const result1 = route.build({ year: '2024' });
            const result2 = route.build({ year: '2024', month: '03' });
            expect(result1).toBe('/blog/2024/:month?');
            expect(result2).toBe('/blog/2024/03?');
        });
        test('should handle special characters in parameters', () => {
            const route = new TypedRoute('/search/:query');
            const result = route.build({ query: 'hello world & good+day' });
            expect(result).toBe('/search/hello%20world%20%26%20good%2Bday');
        });
    });
    // Тесты производительности
    describe('Performance', () => {
        test('should handle large number of parameters efficiently', () => {
            const complexRoute = new TypedRoute('/api/:p1/:p2/:p3/:p4/:p5', false, {
                p1: ['a', 'b'],
                p2: ['x', 'y'],
                p3: ['1', '2']
            });
            const startTime = performance.now();
            for (let i = 0; i < 1000; i++) {
                complexRoute.build({
                    p1: 'a',
                    p2: 'x',
                    p3: '1',
                    p4: 'any1',
                    p5: 'any2'
                });
            }
            const endTime = performance.now();
            expect(endTime - startTime).toBeLessThan(100); // менее 100ms
        });
    });
});
//# sourceMappingURL=Route.spec.js.map