import PageHeader from "../components/layout/PageHeader";
import EventsPreview from "../components/home/EventsPreview";

export default function Events() {
  return (
    <>
      <PageHeader eyebrow="Community" title="Events & Updates" />
      <EventsPreview />
    </>
  );
}
