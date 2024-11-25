import { Request, Response } from 'express';

import { createTweetHandler } from '../../../handlers/tweets/createTweetHandler';
import { createTweet } from '../../../services/tweets/createTweet';
import logger from '../../../utils/logger';

jest.mock('../../../services/tweets/createTweet');
jest.mock('../../../utils/logger');

describe('createTweetHandler', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRequest = { body: {} };
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock })) as jest.Mock;

    mockResponse = {
      status: statusMock,
    };
  });

  it('should return 400 if tweet content is missing', async () => {
    mockRequest.body = {};

    await createTweetHandler(mockRequest as Request, mockResponse as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Invalid or missing tweet content.' });
    expect(logger.info).not.toHaveBeenCalled();
  });

  it('should return 409 if tweet is a duplicate', async () => {
    mockRequest.body = { tweet: 'Duplicate tweet' };
    (createTweet as jest.Mock).mockResolvedValue(false);

    await createTweetHandler(mockRequest as Request, mockResponse as Response);

    expect(statusMock).toHaveBeenCalledWith(409);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Tweet is a duplicate or already processed.' });
    expect(logger.info).toHaveBeenCalledWith('Tweet is a duplicate or already processed');
  });

  it('should return 201 if tweet is created successfully', async () => {
    mockRequest.body = { tweet: 'New tweet' };
    (createTweet as jest.Mock).mockResolvedValue(true);

    await createTweetHandler(mockRequest as Request, mockResponse as Response);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Tweet created successfully' });
    expect(logger.info).toHaveBeenCalledWith('Tweet created successfully');
  });

  it('should return 500 if an unknown error occurs during tweet creation', async () => {
    mockRequest.body = { tweet: 'Error tweet' };
    const error = new Error('Some internal error');
    (createTweet as jest.Mock).mockRejectedValue(error);

    await createTweetHandler(mockRequest as Request, mockResponse as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ error: error.message });
    expect(logger.error).toHaveBeenCalledWith(`Failed to create tweet: ${error.message}`);
  });
});
