package gx.realtime;

import gx.realtime.IndexReference;
import gx.realtime.Model;
import gx.realtime.ReferenceShiftedEvent;

import java.util.Collection;

public class ReferenceUpdater {

    /**
     * This method increments the references of this CollabString that refer to an index after the given index with the given amount.
     * @param model The model to which the corresponding ReferenceShiftedEvents should be sent.
     * @param references The references that should be updated.
     * @param index IndexReferences with an index equal or bigger to this are updated (inclusive).
     * @param amount The amount with which the indexReferences need to be incremented.
     */
    public static void updateReferences(Model model, Collection<IndexReference> references, int index, int amount, boolean isLocal)
    {
        try{
            model.beginCompoundOperation();
            for (IndexReference ref : references) {
                if (ref.getIndex() >= index) {
                    int oldIndex = ref.getIndex();
                    ref.incrementIndex(amount);
                    fireRSEvent(model, ref, oldIndex, isLocal);
                }
            }
            model.endCompoundOperation();
        } catch (Model.NoCompoundOperationInProgressException e){
            e.printStackTrace();
        }
    }

    /**
     * Wrapper method for deleting reference that point to the given range. Iff a reference canBeDeleted, its index is set to -1, else to the
     * start of the deleted range. A corresponding ReferenceShiftedEvent is fired.
     * @param model The model to which the ReferenceShiftedEvents need to be sent.
     * @param references The references of which references with an index >= start && index < start + length should be deleted.
     * @param start The start of the deleted range.
     * @param length The length of the deleted range.
     * @param isLocal Boolean indicating whether the deletion was caused by a local event ora remote event.
     */
    public static void deleteReferences(Model model, Collection<IndexReference> references, int start, int length, boolean isLocal)
    {
        try{
            model.beginCompoundOperation();
            for (IndexReference ref : references) {
                if (ref.getIndex() >= start && ref.getIndex() < start + length) {
                    int oldIndex = ref.getIndex();

                    if(ref.canBeDeleted()){
                        ref.setIndex(-1);
                    } else {
                        ref.setIndex(start);
                    }

                    fireRSEvent(model, ref, oldIndex, isLocal);
                }
            }
            model.endCompoundOperation();
        } catch (Model.NoCompoundOperationInProgressException e) {
            e.printStackTrace();
        }
    }

    /**
     * Wrapper function for sending a ReferenceShiftedEvent for the given reference to the model.
     * @param model The model to which the ReferenceShifted events should be sent.
     * @param ref The IndexReference that has shifted. The index of this reference should already be updated.
     * @param oldIndex The old index of the given reference.
     * @param isLocal Boolean indicating whether the shift was caused by a local change or a remote change. Used to determine whether the event should also be sent to the remote.
     */
    private static void fireRSEvent(Model model, IndexReference ref, int oldIndex, boolean isLocal){
        ReferenceShiftedEvent rsEvent = new ReferenceShiftedEvent(ref, oldIndex, ref.getIndex(), model.getDocument().getSession().getSessionId(), model.getDocument().getMe().getUserId(), isLocal);
        if (isLocal) {
            model.dispatchAndSendEvent(rsEvent);
        } else {
            model.dispatchEvent(rsEvent);
        }
    }
}
