import { createRequest } from '../request-lib';

const wx = {
    request: jest.fn()
};

const request = createRequest({
    requestType: 'wx',
    request: wx,
    platform: 'gitee',
    owner: 'test-owner',
    repo: 'test-repo',
    accessToken: 'test-token'
});

describe('Test Wx Request', () => {
    test('wx get success', async () => {
        wx.request.mockImplementation(({ success }) => {
            success({data: 'success'});
        });
        const result = await request.get('test-url', { order: 'desc'});
        expect(result).toEqual('success');
        expect(wx.request).toHaveBeenCalledWith({
            'fail': expect.any(Function),
            'data': {
                'order': 'desc'
            },
            'header': {
                'Authorization': 'Bearer test-token'
            },
            'method': 'GET',
            'success': expect.any(Function),
            'url': 'test-url'
        });
    });

    test('wx get fail', async () => {
        wx.request.mockImplementation(({ fail }) => {
            fail('fail');
        });
        try {
            await request.get('test-url');
        } catch (error) {
            expect(error).toEqual('fail');
        }
    });

    test('wx post success', async () => {
        wx.request.mockImplementation(({ success }) => {
            success({data: 'success'});
        });
        const result = await request.post('test-url', 'test-body');
        expect(result).toEqual('success');
        expect(wx.request).toHaveBeenCalledWith({
            'fail': expect.any(Function),
            'data': {
                'body': 'test-body'
            },
            'header': {
                'Authorization': 'Bearer test-token'
            },
            'method': 'POST',
            'success': expect.any(Function),
            'url': 'test-url'
        });
    });

    test('wx patch success', async () => {
        wx.request.mockImplementation(({ success }) => {
            success({data: 'success'});
        });
        const result = await request.patch('test-url', 'test-body');
        expect(result).toEqual('success');
        expect(wx.request).toHaveBeenCalledWith({
            'fail': expect.any(Function),
            'data': {
                'body': 'test-body'
            },
            'header': {
                'Authorization': 'Bearer test-token',
                'X-HTTP-Method-Override': 'PATCH'
            },
            'method': 'POST',
            'success': expect.any(Function),
            'url': 'test-url'
        });
    });
});