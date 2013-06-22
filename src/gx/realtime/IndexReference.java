package gx.realtime;

public class IndexReference extends CollaborativeObject
{

    private boolean canBeDeleted;
    public int index;
    private CollaborativeObject referencedObject;

    public IndexReference(String id, Model model, CollaborativeObject referencedObject, int index, boolean canBeDeleted)
    {
        super(id, model);
        this.index = index;
        this.canBeDeleted = canBeDeleted;
        this.referencedObject = referencedObject;
    }

    public boolean canBeDeleted()
    {
        return canBeDeleted;
    }

    public CollaborativeObject collaborativeObject()
    {
        return referencedObject;
    }

    public int getIndex()
    {
        return index;
    }

    public void setIndex(int index)
    {
        this.index = index;
    }

    public void incrementIndex(int amount)
    {
        this.index += amount;
    }

    public void decrementIndex(int amount)
    {
        this.index -= amount;
    }
}
