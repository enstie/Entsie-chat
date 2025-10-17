import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const otherUserId = searchParams.get('userId');

    if (!otherUserId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const messages = await prisma.directMessage.findMany({
      where: {
        OR: [
          { senderId: session.user.id, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: session.user.id }
        ]
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        },
        receiver: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        }
      },
      orderBy: { createdAt: 'asc' },
      take: 100
    });

    await prisma.directMessage.updateMany({
      where: {
        senderId: otherUserId,
        receiverId: session.user.id,
        read: false
      },
      data: { read: true }
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Get direct messages error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content, receiverId, fileUrl } = await req.json();

    if (!content || !receiverId) {
      return NextResponse.json({ error: 'Content and receiver ID are required' }, { status: 400 });
    }

    const message = await prisma.directMessage.create({
      data: {
        content,
        senderId: session.user.id,
        receiverId,
        fileUrl
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        },
        receiver: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        }
      }
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error('Create direct message error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}