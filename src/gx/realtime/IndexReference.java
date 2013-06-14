package gx.realtime;

public class IndexReference extends CollaborativeObject
{

    private boolean canBeDeleted;
    public int index;
    private CollaborativeObject collaborativeObject;

	/* TODO:
     * make sure index updates when position in collaborativeObject changes (see documentation),
	 * + make this depend on canBeDeleted
	 * + take into account that the index property is public
	 */

    public IndexReference(String id, Model model, int index, boolean canBeDeleted)
    {
        super(id, model);
        this.index = index;
        this.canBeDeleted = canBeDeleted;
    }

    public boolean canBeDeleted()
    {
        return canBeDeleted;
    }

    public CollaborativeObject collaborativeObject()
    {
        return collaborativeObject;
    }

}
