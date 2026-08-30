import { AccessToken, TrackSource } from 'livekit-server-sdk';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { roomName, participantName, role } = await request.json();

    if (!roomName || !participantName) {
      return NextResponse.json(
        { error: 'roomName and participantName are required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const wsUrl = process.env.LIVEKIT_URL;

    if (!apiKey || !apiSecret || !wsUrl) {
      return NextResponse.json(
        { error: 'LiveKit configuration is missing' },
        { status: 500 }
      );
    }

    const at = new AccessToken(apiKey, apiSecret, {
      identity: participantName,
    });

    const isStudent = role === 'student';

    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
      // Siswa hanya bisa publish kamera & mikrofon, tidak bisa share screen
      ...(isStudent
        ? { canPublishSources: [TrackSource.CAMERA, TrackSource.MICROPHONE] }
        : {}),
    });

    const token = await at.toJwt();

    return NextResponse.json({ token, wsUrl });
  } catch (error) {
    console.error('Error generating LiveKit token:', error);
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}
