import type { VercelRequest, VercelResponse } from '@vercel/node';
import { webhookService } from '../../src/services/webhookService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = req.body;
    
    // Validate payload structure
    if (!payload.platform || !payload.data) {
      return res.status(400).json({ error: 'Invalid payload structure' });
    }

    // Process the webhook
    await webhookService.processWebhook({
      platform: 'tiktok',
      data: payload.data,
      webhookId: payload.webhookId || 'tiktok-webhook'
    });

    res.status(200).json({ 
      success: true, 
      message: 'TikTok webhook processed successfully' 
    });
  } catch (error) {
    console.error('Error processing TikTok webhook:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
