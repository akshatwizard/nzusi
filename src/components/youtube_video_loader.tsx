import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

type Props = {
    video_id: string;
    title: string;
}

export default function YoutubeVideo({ video_id, title }: Props) {
    return (
        <LiteYouTubeEmbed
            id={video_id}
            key={video_id}
            title={title}
            cookie={false}
            adNetwork={false}
            lazyLoad={true}
            poster="hqdefault"
            webp={true}
        />
    );
}