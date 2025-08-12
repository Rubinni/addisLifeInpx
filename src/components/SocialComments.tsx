import React from 'react';

const socialComments = [
  {
    platform: 'Instagram',
    user: '@sarah_art_lover',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    comment: 'Your street photography captures the soul of the city! 😍',
    likes: 124
  },
  {
    platform: 'Twitter',
    user: '@photo_enthusiast',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
    comment: 'The way you capture light in your nature shots is absolutely stunning!',
    likes: 89
  },
  {
    platform: 'Instagram',
    user: '@creative_eye',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&q=80',
    comment: 'Your portfolio keeps getting better and better! Love the new architectural series.',
    likes: 156
  }
];

export default function SocialComments() {
  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-light text-gray-800 mb-12 text-center">What People Are Saying</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialComments.map((comment, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={comment.avatar}
                  alt={comment.user}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{comment.user}</h4>
                  <p className="text-sm text-gray-500">{comment.platform}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{comment.comment}</p>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                {comment.likes} likes
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}